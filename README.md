# Monorepo with Node.js, Express and Vue 3 SPA

This is a monorepo and includes the following:

### Apps and Packages

- `backend`: a Node.js app that exposes a REST API.
- `frontend`: a Vue.js 3 SPA for books that consumes the REST API exposed by the `backend`.
- `reedsy-types`: a package that contains shared types.
- `eslint-config-reedsy`: ESLint configurations package used throughout the monorepo.

Each package/app is 100% Typescript.

### Tools

- `yarn`: package manager (version 1.22)
- `turborepo`: monorepo management
- `eslint`: linting
- `prettier`: code formatter
- `husky`: git hooks management
- `lint-staged`: run linters on staged files, prior to commits
- `mocha`: testing
- `supertest`: HTTP request testing
- `chai`: assertion library
- other tools used throughout the monorepo

## Getting started

### Installation

To install all dependencies, execute the following command:

```
yarn install
```

### Development

To start active development on all apps and packages, run:

```
yarn dev
```

### Build

To build all apps and packages, use:

```
yarn build
```

### Serving Apps

To serve all applications and packages, run:

```
yarn serve
```

> **Note**: Ensure you've run `yarn build` before serving the applications

### Linting

To run lint checks across all apps and packages, use:

```
yarn lint
```

### Testing

To execute tests across all apps and packages, run:

```
yarn test
```

For end-to-end (e2e) tests, use:

```
yarn test:e2e
```

> **Note**: Remember to run `npx playwright install` before executing e2e tests.

### Type-checking

To perform type-checking across all apps and packages, run:

```
yarn type-check
```

### Formatting

To format all apps and packages using Prettier, use:

```
yarn format
```

### API Endpoints

| Endpoint               | Method | Description                          |
|------------------------|--------|--------------------------------------|
| /import                | POST   | Import functionality endpoint        |
| /import                | GET    | Retrieve import information endpoint |
| /export                | POST   | Export functionality endpoint        |
| /export                | GET    | Retrieve export information endpoint |
| /books                 | GET    | Retrieve all books endpoint          |
| /books?page=1&limit=10 | GET    | Retrieve paginated books endpoint    |

### Optional Query Parameters for /books endpoint:

| Parameter | Description               |
|-----------|---------------------------|
| page      | Specifies the page number |
| limit     | Number of books per page  |
