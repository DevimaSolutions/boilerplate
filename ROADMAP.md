## V1

- Add documentation to `api-client` package
- Figure out how caching works in Next (for authorization and other routes) and if it works fine with api-client package
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
  - rate limiting
  - how file uploads work (temporary memory storage)

# V2:

- Add robots.tsx and sitemap.tsx like on [Vercel commerce](https://github.dev/vercel/commerce)
- Add `infrastructure` package with Terraform & Ansible configuration
- comply with Vercel [Production Checklist](https://vercel.com/docs/production-checklist)
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
