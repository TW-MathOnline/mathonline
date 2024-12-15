# Mathonline

## Initial Project Setup

Ensure that the database has been initialized with the schema. Refer to "How to init database".

- Run `docker-compose -f setup/dev-docker-compose.yml -p mathonline_dev up` to start PostgreSQL, pgAdmin

- Run `npm install` to install deps

- Refer to `How to init database`

- Run `npm run dev` to concurrently launch api and webserver.

## How to init database

Run `cd mo-graphql-api`
Run `npm run force-init-db`

Optional:

- Run `dev:seed` to insert development data into db

# Techstack Documentation

BE:

- Prisma (ORM): https://www.prisma.io/docs/orm
- Yoga GraphQL: https://the-guild.dev/graphql/yoga-server
- PostgreSQL: https://www.postgresql.org/

FE:

- Apollo Client: https://www.apollographql.com/docs/react
- NextJS: https://nextjs.org/docs
- React: https://nextjs.org/
