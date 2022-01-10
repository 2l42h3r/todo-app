

# ToDo App

Simple full-stack ToDo web app as a college project.
Be aware this is not production-ready code. Use at your own discretion.

## Description
### API (packages/todo-api) - NestJS
Consists of 2 APIs;
* REST API for authentication and JWT signing - /api/auth
* GraphQL API for actual user and todo data - /graphql - requires a valid JWT token

### Frontend (packages/to-do-list) - NextJS
Consists of a single server-side route (API) for authentication and storing session. Rest happens on client-side.


### Other tech used:
* Apollo
* TypeScript
* Fastify
* NextAuth
* Passport
* Prisma
* TailwindCSS

## Running the project
### Install
Run
```shell
npm ci
```
in root directory.

### Connecting to DB
Put your DB connection data inside packages/models/.env; A double postgres (db + shadow) combo was used during development; the schema is simple enough to work with any prisma-supported SQL DB.

### Create the schema in the DB/migrate the DB
```shell
npx nx run models:migrate-up
```

### Generate Prisma client library (TypeScript API for interacting with DB and schema)
```shell
npx nx run models:gen-client
```

### Start the API
```shell
npx nx run todo-api:serve
```
By default will run on http://localhost:3333

### Download fresh GraphQL schema from API
```shell
npx nx run to-do-list:fetch-schema
```

### Code-gen query and mutation types for Apollo
```shell
npx nx run to-do-list:schema-codegen
```

### Start frontend
```shell
npx nx run to-do-list:serve
```

## Creating a user
Simply POST (e.g. with Postman) an application/json into /api/auth/register with body-params 'username' and 'password' to create a new user.