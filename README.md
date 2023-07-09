# Reedsy Challenge Node

## About You

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

## 1. Monorepo

This is a monorepo and includes the following packages/apps:

### Apps and Packages

- `backend`: a node app that exposes a REST API
- `frontend`: a Vue 3 books SPA that consumes the REST API exposed by the `backend`
- `types`: a package that contains shared types
- `eslint-config-reedsy`: `eslint` configurations used throughout the monorepo
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `turborepo`: monorepo management

Each package/app is 100% Typescript

### Tools

- `yarn`: package manager
- `turborepo`: monorepo management
- `eslint`: linting
- `prettier`: code formatting
- `husky`: git hooks
- `lint-staged`: run linters on staged files
- `jest`: testing

## 2. Getting started

### 2.1 Install

To install all dependencies, run the following command:

```
yarn install
```

### 2.2 Build

To build all apps and packages, run the following command:

```
yarn build
```

### 2.3 Develop

To develop all apps and packages, run the following command:

```
yarn dev
```

### 2.4 Lint

To lint all apps and packages, run the following command:

```
yarn lint
```

### 2.5 Test

To test all apps and packages, run the following command:

```
yarn test
```

## 3. Node.js REST API

Inside the `apps/backend` folder

### 3.1. Setup

```bash
yarn install
```

### 3.2. Run

```bash
yarn dev
```

### 3.3. Test

```bash
yarn test
```

### 3.4. Lint

```bash
yarn lint
```

## 4. Vue 3 Books SPA

Inside the `apps/frontend` folder

### 4.1. Setup

```bash
yarn install
```

### 4.2. Run

```bash
yarn dev
```

### 4.3. Test

```bash
yarn test
```

### 4.4. Lint

```bash
yarn lint
```
