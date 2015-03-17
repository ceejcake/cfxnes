var logger = require("./logger").get();

//=========================================================
// Dependency injection library
//=========================================================

class Injector {

    constructor(config) {
        logger.info("Creating injector");
        this.dependencies = {};
        this.processConfig(config);

    }

    processConfig(config) {
        console.log(config);
        if (typeof config === "function") {
            logger.info("Building injector configuration");
            config = (config.constructor) ? new config : config();
        }
        logger.info("Processing injector configuration");
        for (name in config) {
            clazz = config[name];
            this.dependencies[name] = {
                clazz: clazz
            };
        }
    }

    getDependency(name) {
        var dependency = this.dependencies[name];
        if (!dependency) {
            throw new Error(`Dependency '${name}' not found.`);
        }
        return dependency;
    }

    getClass(name) {
        return this.getDependency(name).clazz;
    }

    get(name) {
        var dependency = this.getDependency(name);
        if (!dependency.instance) {
            dependency.instance = this.create(name);
            this.inject(dependency.instance);
        }
        return dependency.instance;
    }

    create(name) {
        logger.info(`Creating instance of '${name}'`);
        return new(this.getClass(name))(this);
    }

    inject(instance) {
        var dependencies = instance.constructor.dependencies;
        var injectMethod = instance.inject || instance.init;
        if (dependencies && injectMethod) {
            logger.info(`Injecting dependencies: ${dependencies.join(", ")}`);
            var resolvedDependencies = []
            for (var name of dependencies) {
                resolvedDependencies.push(this.get(name));
            }
            injectMethod.apply(instance, resolvedDependencies);
        }
        return instance;
    }

}

module.exports = Injector;