import path from 'node:path';
import antfu from '@antfu/eslint-config';


export default antfu(
  {
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: true,
    },

    typescript: {
      tsconfigPath: path.resolve('./tsconfig.json'),
      overridesTypeAware: {
        'ts/restrict-template-expressions': ['error', {
          allowAny: false,
          allowBoolean: false,
          allowNullish: false,
          allowNumber: true,
          allowRegExp: false,
          allowNever: false,
        }],
        'ts/no-misused-promises': ['error', { checksVoidReturn: false }],
        'ts/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      },
    },

    isInEditor: true,

    react: true,

    formatters: {
      css: true,
    },

    ignores: [
      'public',
      '**/node_modules/**',
      '**/build/**',
      '**/out/**',
      '**/dist/**',
      '.netlify',
    ],

    rules: {
      'unused-imports/no-unused-imports': 'error',
      'import/newline-after-import': ['error', { count: 2 }],
      'no-restricted-imports': ['error', { patterns: ['../'] }],
      'style/no-multiple-empty-lines': ['error', { max: 2 }],
      'antfu/if-newline': 'off',
      'style/brace-style': ['off', '1tbs'],
      'no-shadow': 'error',
      'object-curly-newline': ['error', {
        minProperties: 6,
        multiline: false,
        consistent: true,
      }],
      'max-lines-per-function': ['error', 200],
      'max-statements': ['error', 50, { ignoreTopLevelFunctions: true }],
      'style/object-curly-newline': ['error', { consistent: true, minProperties: 4 }],
      'node/prefer-global/process': 'off',
    },
  },
  {
    files: ['**/*.tsx', '**/*.jsx'],
    rules: {
      'react-refresh/only-export-components': ['error', {
        allowExportNames: [
          'dynamicParams',
          'dynamic',
          'generateStaticParams',
          'generateMetadata',
          'metadata',
          'getStaticProps',
          'getStaticPaths',
        ],
      }],
      'style/jsx-one-expression-per-line': ['error', { allow: 'non-jsx' }],
      'style/jsx-max-props-per-line': ['warn', { maximum: { multi: 1, single: 3 } }],
      'style/jsx-sort-props': ['error', { callbacksLast: true, shorthandFirst: true }],
    },
  },
);
