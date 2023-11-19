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
  root: true,
  env: {
    node: true,
    jest: true,
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
