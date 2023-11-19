/*
 * This is a custom ESLint configuration for use with
 * internal (bundled by their consumer) libraries
 * that utilize React.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve('@vercel/style-guide/eslint/react'),
    'custom/base',
  ],
  globals: {
    JSX: true,
  },
  ignorePatterns: ['node_modules/', 'dist/', '.eslintrc.js'],

  rules: {
    // add specific rules configurations here
  },
};
