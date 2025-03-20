# AdonisJS Inertia Starter Kit

This repo contains an AdonisJS application tailored for building an Inertia powered application using your favorite frontend framework. ( React, Vue, Solid.js, Svelte )

## What's included

- TypeScript setup with commands to run developments server using `ts-node + swc` and create production build.
- ESLint and Prettier setup extending the [AdonisJS tooling config](https://github.com/adonisjs/tooling-config) presets.
- Ace command line framework.
- Everything else you get with the core of AdonisJS.

On top of the framework core and dev-tooling, the following features are enabled by the inertia starter kit.

- Lucid ORM ( Installed, but not configured )
- Auth module ( Installed, but not configured )
- CSRF protection
- Edge template engine
- VineJS for validations
- Static files server
- Vite for bundling and serving frontend assets
- Inertia.js for building server-driven single-page apps
- Your favorite frontend framework ( React, Vue, Solid.js, Svelte )

## Usage

You can create a new app using the `inertia` boilerplate by executing the following command. The command will perform the following steps.

- Clone the repo
- Install dependencies
- Copy `.env.example` to `.env`
- Set app key using `node ace generate:key` command.
- Configure `@adonisjs/lucid` package.
- Configure `@adonisjs/auth` package.
- Configure `@adonisjs/inertia` package.

```sh
npm init adonisjs -- -K=inertia
```

### Configuring Lucid database dialect

```sh
npm init adonisjs -- -K=inertia --db=postgres
```

Available options for the `--db` flag.

- sqlite
- postgres
- mysql
- mssql

### Configuring Auth package guard

```sh
npm init adonisjs -- -K=inertia --auth-guard=access_tokens
```

Available options for the `--auth-guard` flag.

- session
- basic_auth
- access_tokens

### Configuring Inertia

You can pass the `--adapter` flag to configure the frontend adapter. Available options are `react`, `vue`, `solid`, and `svelte`.

```sh
npm init adonisjs -- -K=inertia --adapter=react
```

You can also pass the `--ssr` or `--no-ssr` flag to enable or disable server-side rendering.

```sh
npm init adonisjs -- -K=inertia --ssr
```
