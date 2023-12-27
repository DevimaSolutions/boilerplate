# boilerplate-devima-solutions

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `backend`: a [Nest.js](https://nestjs.com/) backend app
- `frontend`: a [Next.js](https://nextjs.org/) frontend app
- `api-client`: API client automatically generated from `backend`'s Swagger specs. It should be used to perform API calls from the `frontend` project
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Develop

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for a guide on how to run the project locally.

### Build

You have 2 options to build production version of the app.

For both cases please make sure you filled `./apps/backend/.env` and `./apps/frontend/.env` files with variables you would like to use for production environment first.

1. Now you can run it as a docker image by executing the following command:

```sh
yarn docker:production
```

2. Or see how the build process setup in [Github workflows](./.github/workflows/ci-main.yml)

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
