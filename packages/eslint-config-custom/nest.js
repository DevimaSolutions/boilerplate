const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use with
 * Nest.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    'custom/base',
  ],
  parserOptions: {
    project,
  },
  root: true,
  env: {
    node: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
    // need to exclude parent node modules from import/named rule
    // https://github.com/import-js/eslint-plugin-import/blob/v2.28.1/docs/rules/named.md#settings
    'import/ignore': ['node_modules', '../../node_modules'],
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/no-default-export': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    'import/no-cycle': ['error', { ignoreExternal: true }],
    '@typescript-eslint/consistent-type-imports': 'off',
  },
  ignorePatterns: ['node_modules/', 'dist/'],
};
