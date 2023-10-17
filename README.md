# {{Put your app name here}}

## TODO:

- Add cooke based auth
- Add `commitlint`
- Add swagger ts codegen to generate `api-client` package
- Add documentation to `api-client` package

- Add husky hook to `lint` backend before commit
- Add husky hook to `build` backend before commit
- Add husky hook to generate `api-client` before commit
- Add husky hook to `lint` frontend before commit
- Add husky hook to `tsc --noEmit` frontend before commit

- Add readme for transactions usage
- Add PM2 to both frontend and backend production deployment flows
- Make is so that the source code is not copied to the production server (build happens locally or in Github action)

- Add `infrastructure` package with Terraform & Ansible configuration
- Add github action to deploy from main and staging branches using Ansible
- Add command to deploy main or staging branches using Ansible form local machine
- Pricing (Ansible is open-source and free, Terraform Cloud has up tp 5000 resource/hours/month and up to 5 users)
- Using this deployment approach we'll probably abandon the use of Vercel

- Finish this `readme`

- Add generator script to allow initiate project from boilerplate with selected features included

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
