/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/next'),
    require.resolve('eslint-config-turbo'),
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'custom/base',
  ],
  globals: {
    React: true,
    JSX: true,
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  // add rules configurations here
  rules: {
    'import/no-default-export': 'off',
    'turbo/no-undeclared-env-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@tanstack/query/stable-query-client': 'error',
    'react/hook-use-state': 'off',
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
        // react components should be in PascalCase
        // and react hooks should be in camelCase
        ignore: ['^use.+\\.ts$', '^.+\\.tsx$'],
      },
    ],
  },
};
