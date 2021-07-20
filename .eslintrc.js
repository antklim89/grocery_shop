module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb',
        'plugin:@typescript-eslint/recommended',
        'next',
        'next/core-web-vitals',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        'import/no-unresolved': 0,
        'import/prefer-default-export': 0,
        'import/extensions': 0,
        'import/newline-after-import': ['error', { count: 2 }],
        'import/order': [1, {
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
            'newlines-between': 'always',
            alphabetize: {
                order: 'asc', /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */
                caseInsensitive: true, /* ignore case. Options: [true, false] */
            },
        }],
        'import/no-extraneous-dependencies': [
            'error', { devDependencies: ['*.js'] }],

        'react/jsx-sort-props': [1, { callbacksLast: true, shorthandFirst: true }],
        'react/jsx-max-props-per-line': [1, { maximum: 3 }],
        'react/prop-types': 0,
        'react/jsx-props-no-spreading': 0,
        'react/jsx-indent': [1, 4],
        'react/jsx-indent-props': [1, 4],
        'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
        'react/jsx-no-duplicate-props': [2, { ignoreCase: false }],
        'react/react-in-jsx-scope': 0,
        'react/require-default-props': 0,
        'react/destructuring-assignment': 0,
        'react-hooks/exhaustive-deps': 0,

        '@typescript-eslint/no-shadow': 2,
        '@typescript-eslint/no-unused-vars': [1, { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-empty-interface': 0,

        'no-use-before-define': 0,
        'no-shadow': 0,
        'no-undef': 0,
        'no-useless-constructor': 0,
        'no-multiple-empty-lines': [1, { max: 2 }],
        'arrow-body-style': 0,
        'no-unused-vars': 0,
        indent: [1, 4],
        'no-debugger': 0,
        'no-console': 0,
        'max-len': [1, { code: 120, ignoreComments: true }],
        'no-restricted-syntax': ['error', 'WithStatement'],
        camelcase: 0,

        'jsx-a11y/anchor-is-valid': 0,
    },
    settings: {
        react: {
            pragma: 'React', // Pragma to use, default to "React"
            fragment: 'Fragment', // Fragment to use (may be a property of <pragma>), default to "Fragment"
            version: 'detect', // React version. "detect" automatically picks the version you have installed.
        },
    },

};
