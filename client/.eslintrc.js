module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard',
    ],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        semi: ['error', 'never'],
        eqeqeq: 'off',
        // 'eqeqeq': ['error', 'smart'], - want to switch this back on, but need to work through them all first
        indent: ['error', 4, {
            SwitchCase: 1,
        }],
        'space-before-function-paren': 'off',
        // "space-before-function-paren": [2, 'never'], - want to switch this back on, but need to work through them all first
        'template-curly-spacing': [2, 'always'],
        'no-var': 2,
        'no-trailing-spaces': 0,
        'no-extend-native': 'off', // want to switch this back on, but need to sort out the util.js file first
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // trailing comma
        'comma-dangle': ['error', 'always-multiline'],
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'any',
                },
            },
        ],
        'vue/script-indent': ['error', 4, { baseIndent: 1 }],
    },
    overrides: [
        {
            files: [
                '**/tests/unit/**/*.spec.{j,t}s?(x)',
            ],
            env: {
                jest: true,
            },
        },
        {
            files: ['*.vue'],
            rules: {
                indent: 'off',
            },
        },
    ],
}
