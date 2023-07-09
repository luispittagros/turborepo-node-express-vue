# Reedsy Challenge Node

## About Me

With over 8 years of hands-on experience, I've worked as a Senior Full Stack Developer, specializing in TypeScript, Vue,
React and Node.

During my time as a Senior Full Stack Developer at Hypnotic Agency, I led the development of Galp's new client portal.
Galp, akin to BP, is a major player in the energy sector and required a user-centric platform that could serve thousands
of users daily.

The project was a significant undertaking, and it was built using Vue and TypeScript. These technologies were chosen at
the time for their robustness and the productivity they offer, allowing us to create a platform that was not only
functional but also intuitive and user-friendly.

Despite the project's complexity, I'm proud to say that we delivered the platform on time and to high standards. Today,
it's still being used by thousands of users every day.

## Document Versioning

A potential solution could involve using a version control system like Git. Each novel could be a repository, and each
version of the novel could be a commit. This would allow you to view the novel at any point in its history, see the
changes made between two versions, and it's disk space efficient. The trade-off is that it might be overkill for this
use case, and it might be difficult to implement for non-technical users. Potential mitigations could involve creating a
user-friendly interface on top of the Git commands.

- **Current State**: The latest committed version of the novel represents its current state. Git makes it easy to view
  this by checking out the main branch or any other branch that represents a version of the novel.

- **Novel History**: Git maintains a full history of all changes, allowing you to view the novel at any point in its
  history. This can be done using git checkout along with the hash of the commit you want to view.

- **Changes Between Versions**: Git diff can be used to show changes made between two versions. It provides line-by-line
  changes and can be very informative for seeing exactly what was altered between versions.

- **Disk Space Efficiency**: Git is designed to be very space-efficient. It uses techniques like packfiles and the use
  of SHA-1 hashes to save space and ensure data integrity. Even though every version of every file is saved, Git
  compresses the data and stores it efficiently.

- **Trade-offs**: While Git is powerful and space-efficient, it can be complex to use and overkill for some
  applications. Its merging strategies might not be suitable for all types of text files, especially for large binary
  files or for files that undergo many changes. One potential mitigation could be to use Git Large File Storage (LFS)
  for larger files.

- **Domain-specific issues**: For a novel, especially one undergoing many revisions, tracking changes at the line level
  might not be ideal. A more domain-specific versioning system could be implemented that understands the structure of a
  novel and can track changes at a more suitable granularity, like the paragraph or even sentence level.

## Monorepo

This is a monorepo and includes the following packages/apps:

### Apps and Packages

- `backend`: a node app that exposes a REST API
- `frontend`: a Vue 3 books SPA that consumes the REST API exposed by the `backend`
- `reedsy-types`: a package that contains shared types
- `eslint-config-reedsy`: `eslint` configurations used throughout the monorepo
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `turborepo`: monorepo management

Each package/app is 100% Typescript

### Tools

- `yarn`: package manager (version 1.22)
- `turborepo`: monorepo management
- `eslint`: linting
- `prettier`: code formatting
- `husky`: git hooks
- `lint-staged`: run linters on staged files
- `mocha`: testing
- `supertest`: HTTP assertions
- `chai`: assertion library
- other packages used throughout the monorepo

## Getting started

### Install

To install all dependencies, run the following command:

```
yarn install
```

### Develop

To develop all apps and packages, run the following command:

```
yarn dev
```

### Build

To build all apps and packages, run the following command:

```
yarn build
```

### Lint

To lint all apps and packages, run the following command:

```
yarn lint
```

### Test

To test all apps and packages, run the following command:

```
yarn test
```

### Type-check

To type-check all apps and packages, run the following command:

```
yarn type-check
```

### Format

To format all apps and packages, run the following command:

```
yarn format
```

