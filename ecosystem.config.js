require('dotenv').config({ path: 'apps/frontend/.env' });

const appName = process.env.NEXT_PUBLIC_APP_NAME?.toLowerCase() ?? 'app';

if (!process.env.NVM_DIR) {
  throw new Error("NVM_DIR env variable not found!")
}
if (!process.version) {
  throw new Error("Running unknown node version!")
}
const interpreterPath = `${process.env.NVM_DIR}/versions/node/${process.version}/bin/node`

module.exports = {
  apps: [
    {
      name: `${appName} backend`,
      cwd: './apps/backend',
      script: 'dist/main.js',
      interpreter: interpreterPath,
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
      interpreter: interpreterPath,
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
