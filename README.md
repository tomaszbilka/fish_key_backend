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

```bash
# create migration
yarn db:create src/migrations/<migration_name>

# run migration
yarn db:migrate

# drop data base
yarn db:drop

# seed data base
yarn db:seeds
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

- forgot password

```bash
POST /auth/forgot-password
#body
{
    "email":
}
#response, status 201:
{
    "message": "Password reset email sent successfully"
}
```

- reset password

```bash
POST /auth/reset-password
#body
{
    "resetToken":
    "newPassword":
}
#response, status 201:
{
     message: 'Password reset successfully'
}
```
