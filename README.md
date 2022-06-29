# Daylight.xyz web app

## Tech stack

- Next.js
- styled-components for most styles, Tailwind for prototyping
- [Prisma](https://www.prisma.io/docs/getting-started) for ORM
- Vercel for hosting
- Supabase for Postgres hosting

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Setting up a local database

On a Mac, install [Postgres.app](https://postgresapp.com/) and use it to [create a new database](https://stackoverflow.com/a/26156337) named "daylightxyz".

You may create a Postgres user with any name and password you like to own this database. Postgres.app lets you use your system user / pass. Make sure the user has permissions to create databases: `ALTER USER username CREATEDB;`.

## Setting up a local database for the first time

Make sure to run `yarn` or `npm install` to download the relevant files.

1. Copy and rename `.env.example` to `.env`.
2. Open that file namd change the DATABASE_URL string to your username, password, etc.
3. Run `npx prisma migrate dev` to apply the Prisma schema to your local database.
4. You MUST do one of the following for authentication to work in the dev environment!

- Only ever load the web app from http://localhost:3000.
- If you must use another URL or port, change the `NEXTAUTH_URL=` var in `.env`.

Once you've done that, you should be able to sign in with a wallet on dev!

## Custom preview links

- /<address>/items
- /<address>/updates
- /<address>/digest
- /<address>/verify-email
- /verify/test/error
- /verify/test/success
