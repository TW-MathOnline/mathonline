# Mathonline

## Project Setup

Run `npm install`

To start the postgres server run `docker-compose -f docker-compose.dev.yml -p mathonline up -d`
-> -f overrides the filename
-> -p provides the project name

Run `npm run dev`

## How to init database

Refer to the .readme of mo-graphql-api package.

# Techstack Documentation

BE:

- Prisma (ORM): https://www.prisma.io/docs/orm
- Yoga GraphQL: https://the-guild.dev/graphql/yoga-server
- PostgreSQL: https://www.postgresql.org/

FE:

- Apollo Client: https://www.apollographql.com/docs/react
- NextJS: https://nextjs.org/docs
- React: https://nextjs.org/
