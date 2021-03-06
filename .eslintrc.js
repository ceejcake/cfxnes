module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'script',
  },
  env: {
    es6: true,
    node: true,
  },
  plugins: [
    'import',
  ],
  reportUnusedDisableDirectives: true,
  rules: {
    'array-bracket-spacing': 'warn',
    'array-callback-return': 'error',
    'arrow-parens': ['warn', 'as-needed'],
    'arrow-spacing': 'warn',
    'block-scoped-var': 'error',
    'block-spacing': 'warn',
    'brace-style': ['warn', '1tbs', {'allowSingleLine': true}],
    'camelcase': 'warn',
    'comma-dangle': ['warn', 'always-multiline'],
    'comma-spacing': 'warn',
    'comma-style': 'warn',
    'computed-property-spacing': 'warn',
    'consistent-return': 'error',
    'consistent-this': 'warn',
    'constructor-super': 'error',
    'curly': ['warn', 'multi-line'],
    'dot-location': ['warn', 'property'],
    'eol-last': 'warn',
    'eqeqeq': ['error', 'smart'],
    'for-direction': 'error',
    'func-call-spacing': 'warn',
    'function-paren-newline': ['warn', 'consistent'],
    'generator-star-spacing': 'warn',
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': 'warn',
    'import/first': 'error',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/newline-after-import': 'warn',
    'import/no-deprecated': 'warn',
    'import/no-duplicates': 'warn',
    'import/no-extraneous-dependencies': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default': 'error',
    'import/no-named-default': 'error',
    'import/no-unassigned-import': ['error', {'allow': ['**/*.css']}],
    'import/no-unresolved': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/order': 'warn',
    'import/unambiguous': 'error',
    'indent': ['warn', 2, {
      'SwitchCase': 1,
      'ObjectExpression': 'first',
      'FunctionDeclaration': {'parameters': 'first'},
      'ignoredNodes': ['JSXAttribute', 'JSXSpreadAttribute'],
    }],
    'jsx-quotes': ['warn', 'prefer-double'],
    'key-spacing': 'warn',
    'keyword-spacing': 'warn',
    'linebreak-style': 'warn',
    'lines-between-class-members': 'warn',
    'new-cap': ['warn', {'newIsCapExceptions': ['class', 'clazz']}],
    'nonblock-statement-body-position': 'error',
    'no-array-constructor': 'error',
    'no-await-in-loop': 'error',
    'no-caller': 'error',
    'no-case-declarations': 'error',
    'no-catch-shadow': 'error',
    'no-class-assign': 'error',
    'no-compare-neg-zero': 'error',
    'no-cond-assign': 'error',
    'no-confusing-arrow': ['error', {'allowParens': true}],
    'no-console': 'warn',
    'no-const-assign': 'error',
    'no-constant-condition': 'error',
    'no-control-regex': 'error',
    'no-debugger': 'error',
    'no-delete-var': 'error',
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-duplicate-imports': 'warn',
    'no-else-return': 'warn',
    'no-empty': 'error',
    'no-empty-character-class': 'error',
    'no-empty-pattern': 'error',
    'no-eval': 'error',
    'no-ex-assign': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-boolean-cast': 'error',
    'no-extra-label': 'warn',
    'no-extra-semi': 'error',
    'no-fallthrough': 'error',
    'no-floating-decimal': 'warn',
    'no-func-assign': 'error',
    'no-global-assign': 'error',
    'no-implicit-coercion': 'warn',
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'no-inner-declarations': 'error',
    'no-invalid-regexp': 'error',
    'no-invalid-this': 'error',
    'no-irregular-whitespace': 'error',
    'no-iterator': 'error',
    'no-label-var': 'error',
    'no-lone-blocks': 'error',
    'no-lonely-if': 'warn',
    'no-mixed-operators': 'warn',
    'no-mixed-spaces-and-tabs': 'warn',
    'no-multi-assign': 'error',
    'no-multi-spaces': ['warn', {'ignoreEOLComments': true}],
    'no-multi-str': 'warn',
    'no-multiple-empty-lines': ['warn', {'max': 1}],
    'no-native-reassign': 'error',
    'no-negated-in-lhs': 'error',
    'no-nested-ternary': 'warn',
    'no-new': 'warn',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-require': 'error',
    'no-new-symbol': 'error',
    'no-new-wrappers': 'error',
    'no-obj-calls': 'error',
    'no-octal': 'error',
    'no-octal-escape': 'warn',
    'no-path-concat': 'warn',
    'no-proto': 'error',
    'no-redeclare': 'error',
    'no-regex-spaces': 'error',
    'no-return-assign': 'error',
    'no-return-await': 'error',
    'no-script-url': 'error',
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-shadow': 'error',
    'no-spaced-func': 'warn',
    'no-sparse-arrays': 'error',
    'no-tabs': 'warn',
    'no-template-curly-in-string': 'error',
    'no-this-before-super': 'error',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'warn',
    'no-undef': 'error',
    'no-undef-init': 'warn',
    'no-underscore-dangle': 'warn',
    'no-unexpected-multiline': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unneeded-ternary': 'warn',
    'no-unreachable': 'error',
    'no-unsafe-negation': 'error',
    'no-unused-expressions': 'error',
    'no-unused-labels': 'error',
    'no-unused-vars': ['error', {'ignoreRestSiblings': true}],
    'no-use-before-define': ['error', {'functions': false, 'classes': false}],
    'no-useless-call': 'error',
    'no-useless-computed-key': 'warn',
    'no-useless-concat': 'warn',
    'no-useless-constructor': 'warn',
    'no-useless-escape': 'warn',
    'no-useless-return': 'error',
    'no-var': 'error',
    'no-void': 'error',
    'no-whitespace-before-property': 'warn',
    'no-with': 'error',
    'object-curly-spacing': ['warn', 'never'],
    'object-shorthand': ['warn', 'always', {'avoidQuotes': true}],
    'operator-linebreak': ['warn', 'before'],
    'padded-blocks': ['warn', { 'classes': 'always' }],
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': ['warn', {'array': false, 'object': true}],
    'prefer-numeric-literals': 'warn',
    'prefer-promise-reject-errors': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'quote-props': ['warn', 'consistent'],
    'quotes': ['warn', 'single'],
    'require-await': 'error',
    'rest-spread-spacing': ['warn', 'never'],
    'semi': 'warn',
    'semi-spacing': 'warn',
    'semi-style': 'warn',
    'space-before-blocks': 'warn',
    'space-before-function-paren': ['warn', 'never'],
    'space-in-parens': 'warn',
    'space-infix-ops': 'warn',
    'space-unary-ops': 'warn',
    'spaced-comment': ['warn', 'always', {'exceptions': ['-', '=']}],
    'switch-colon-spacing': 'warn',
    'template-curly-spacing': 'warn',
    'template-tag-spacing': 'warn',
    'unicode-bom': 'error',
    'use-isnan': 'error',
    'valid-typeof': 'error',
    'wrap-iife': ['error', 'inside'],
    'yield-star-spacing': 'warn',
    'yoda': 'warn',
  },
};
