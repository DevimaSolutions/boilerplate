# {{Put your app name here}}

## TODO:

- Add cookie based auth
- Add documentation to `api-client` package
- Figure out how caching works in Next (for authorization and other routes) and if it works fine with api-client package
- Test api-client with form data
- Add error response definition to swagger so `api-client` can handle errors
- Add function `throwOnError` to automatically optionaliy throw on error responses

- Test S3 service

- Add readme for transactions usage
- Add PM2 to both frontend and backend production deployment flows
- Make is so that the source code is not copied to the production server (build happens locally or in Github action)

- Prepare presentation that cover major changes

  - const enums
  - remove I and T prefixes when declaring types
  - absolute project-based imports
  - shared eslint/ts configs
  - more strict eslint config
  - yarn workspaces
  - turborepo basics
  - unit testing
  - git hooks (commit lint, eslint)
  - automatic transaction context
  - migrations
  - deployment workflow/pm2
  - new authorization architecture
  - next app router / (and it's too aggressive caching)
  - why we should not use barrel files anymore

# V2 TODO:

- Add `infrastructure` package with Terraform & Ansible configuration
- Add github action to deploy from main and staging branches using Ansible
- Add command to deploy main or staging branches using Ansible form local machine
- Pricing (Ansible is open-source and free, Terraform Cloud has up tp 5000 resource/hours/month and up to 5 users)
- Using this deployment approach we'll probably abandon the use of Vercel
- add logging
- Note that NVM is required to be installed
- Finish this `readme`
- Add rate limiting to public endpoints (100 req/session/10 min interval)

- Add generator script to allow initiate project from boilerplate with selected features included
- Add option to use DB logger in production https://docs.nestjs.com/techniques/logger
- Add DevOps panel to manage
  - running jobs/queues
  - see logs
  - complex health checks https://docs.nestjs.com/recipes/terminus
  - Set env variables

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `backend`: a [Nest.js](https://nestjs.com/) backend app
- `frontend`: a [Next.js](https://nextjs.org/) frontend app
- `api-client`: API client automatically generated from Swagger. It should be used to perform API calls from the `frontend` project
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
yarn build
```

### Develop

To develop all apps and packages, run the following command:

```
yarn dev
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
