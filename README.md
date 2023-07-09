# Reedsy Challenge Node

## What's inside?

This is a monorepo and includes the following packages/apps:

### Apps and Packages

- `backend`: a node app that exposes a REST API
- `frontend`: a Vue 3 books SPA that consumes the REST API exposed by the `backend`
- `types`: a package that contains shared types
- `eslint-config-reedsy`: `eslint` configurations used throughout the monorepo
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% Typescript

### Tools

- `yarn`: package manager
- `turborepo`: monorepo management
- `eslint`: linting
- `prettier`: code formatting
- `husky`: git hooks
- `lint-staged`: run linters on staged files

## Getting started

### Install

To install all dependencies, run the following command:

```
yarn install
```

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

### Lint

To lint all apps and packages, run the following command:

```
yarn lint
```