require('dotenv').config({ path: 'apps/frontend/.env' });

const appName = process.env.NEXT_PUBLIC_APP_NAME?.toLowerCase() ?? 'app';

module.exports = {
  apps: [
    {
      name: `${appName} backend`,
      cwd: './apps/backend',
      script: 'dist/main.js',
      interpreter: '/root/.nvm/versions/node/v20.11.0/bin/node',
      instances: '1',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 7020
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 7020
      },
    },
    {
      name: `${appName} frontend`,
      script: 'server.js',
      interpreter: '/root/.nvm/versions/node/v20.11.0/bin/node',
      cwd: './apps/frontend/.next/standalone/apps/frontend',
      instances: '1',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 7019
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 7019
      },
    },
  ],
};
