## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Migrations

## Migrations

```bash
# create migration
yarn db:create /src/migrations/<migration_name>

# run migration
yarn db:migrate

# drop data base
yarn db:drop

# seed data base
yarn db:seed
```

## Endpoints

- register

```bash
POST /auth/register
#body
{
    "email":
    "password":
}
#response, status 201:
{
    "id":
    "email":
}
```

- login

```bash
POST /auth/login
#body
{
    "email":
    "password":
}
#response, status 201:
{
    access_token:
}
#access token should be used as a Bearer authorization.
```
