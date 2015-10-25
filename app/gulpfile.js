var browser = require('browser-sync').create();
var fs = require('fs');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var gulp = require('gulp');
var server = require('gulp-develop-server');
var gulpif = require('gulp-if');
var jscs = require('gulp-jscs');
var less = require('gulp-less');
var replace = require('gulp-replace');
var riot = require('gulp-riot');
var uglify = require('gulp-uglify');
var Autoprefix = require('less-plugin-autoprefix');
var CleanCSS = require('less-plugin-clean-css');
var merge = require('merge2');
var mkdirp = require('mkdirp');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var yargs = require('yargs');

//=========================================================
// Arguments
//=========================================================

var argv = yargs
  .boolean('d').alias('d', 'debug')
  .boolean('a').alias('a', 'analytics')
  .argv;

//=========================================================
// Client
//=========================================================

gulp.task('scripts', function() {
  var libs = gulp.src([
    './node_modules/js-md5/build/md5.min.js',
    './node_modules/jszip/dist/jszip.min.js',
    './node_modules/screenfull/dist/screenfull.js',
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/jquery.browser/dist/jquery.browser.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/bootstrap-slider/dist/bootstrap-slider.min.js',
    './node_modules/riot/riot.min.js',
  ]);
  var app = gulp.src('./src/client/app.js');
  var tags = gulp.src('./src/client/tags/**/*.tag').pipe(riot());
  var appTags = merge(app, tags).pipe(gulpif(!argv.debug, uglify()));
  return merge(libs, appTags)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/static/'))
});

gulp.task('styles', function() {
  var autoprefix = new Autoprefix({browsers: ['last 2 versions']});
  var cleancss = new CleanCSS({advanced: true, keepSpecialComments: false});
  var options = {
    paths: [
      './node_modules/bootstrap/less/',
      './node_modules/bootstrap-slider/less/',
      './node_modules/font-awesome/less/',
    ],
    plugins: argv.debug ? [autoprefix] : [autoprefix, cleancss],
  };
  return gulp.src('./src/client/app.less')
    .pipe(less(options))
    .pipe(gulp.dest('./dist/static/'))
    .pipe(browser.stream());
});

gulp.task('pages', function() {
  return gulp.src('./src/client/index.html')
    .pipe(replace('<!-- Google Analytics -->',
      argv.analytics ? fs.readFileSync('./src/client/ga.html', 'utf8') : ''))
    .pipe(gulp.dest('./dist/static/'));
});

gulp.task('images', function() {
  return gulp.src('./src/client/**/*.{png,jpg,gif,svg}')
    .pipe(gulp.dest('./dist/static/'));
});

gulp.task('fonts', function() {
  return gulp.src('./node_modules/font-awesome/fonts/fontawesome-webfont.*')
    .pipe(gulp.dest('./dist/static/fonts/'));
});

gulp.task('client', gulp.parallel('scripts', 'styles', 'pages', 'images', 'fonts'));

//=========================================================
// Server
//=========================================================

gulp.task('server', function() {
  return gulp.src('./src/server/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./dist/'));
});

//=========================================================
// Build
//=========================================================

gulp.task('dirs', function(done) {
  mkdirp.sync('./dist/');
  done();
});

gulp.task('symlinks', function(done) {
  if (process.platform === 'win32') {
    done(); // Common Windows user doesn't have right to create symbolic links
  } else {
    mkdirp.sync('../roms/');
    return gulp.src('../roms/')
      .pipe(gulp.symlink('./dist/'));
  }
});

gulp.task('build', gulp.series('dirs', gulp.parallel('client', 'server')));

//=========================================================
// Watch
//=========================================================

gulp.task('watch',  function(d) {
  gulp.watch('./src/client/**/*.{js,tag}', gulp.series('scripts', browser.reload));
  gulp.watch('./src/client/**/*.less', gulp.series('styles'));
  gulp.watch('./src/client/**/*.html', gulp.series('pages', browser.reload));
  gulp.watch('./src/server/**/*.js', gulp.series('server', 'restart'));
});

//=========================================================
// Run
//=========================================================

gulp.task('run', function() {
  var options = {
    env: {
      NODE_ENV: 'development',
      NODE_PATH: __dirname + '/node_modules',
    },
    path: './dist/app.js',
  };
  server.listen(options, function(error) {
    if (!error) {
      browser.init({proxy: 'http://localhost:5000'})
    }
  });
});

gulp.task('restart', function() {
  server.restart(function(error) {
    if (!error) {
      browser.reload();
    }
  });
});

//=========================================================
// Check source code style
//=========================================================

gulp.task('check', function() {
  return gulp.src('./{src,test}/**/*.js')
    .pipe(jscs())
    .pipe(jscs.reporter());
});

//=========================================================
// Default
//=========================================================

gulp.task('default', gulp.series('build', 'symlinks', gulp.parallel('watch','run')));
