# Documentation

## Description

This project is the cline side of the messaging app. <br/>
It's a single page web chat application built with React and [Socket.io](https://socket.io/).

## Getting Started

> Requires Node >= 14

[Create a repo from this template on GitHub](https://github.com/refaelbenzvi24/viterect/generate).

or

clone the repo `git clone git@github.com:Refaelbenzvi24/Messaging-frontend.git Messaging-frontend`

then

```bash
cd Messaging-frontend
pnpm i # If you don't have pnpm installed, run: npm install -g pnpm
```

## Scripts

- `pnpm start` - build and start production server
- `pnpm start:test` - build and start production server in test mode.
- `pnpm build` - build for production. The generated files will be on the `dist` folder.
- `pnpm build:test` - build for testing. The generated files will be on the `tests/dist` folder.
- `pnpm serve` - locally start the production build.
- `pnpm serve:test` - locally start the testing build.
- `pnpm clean` - clean build directory
- `pnpm commit` - commit using commitizen
- `pnpm dev` - start a development server with hot reload.
- `pnpm dev:test` - start a development server with hot reload in test mode - used for running cypress tests with
  coverage.
- `extract-translations` - extract translations from source files using `i18next`. configuration file for this is
  on `i18next-parser.config.js`. The generated files will be on the `public/locales` folder.
- `pnpm prepare:husky` - install husky.
- `pnpm lint` - runs TypeScript and ESLint.
- `pnpm lint:eslint` - runs ESLint.
- `pnpm lint:tsc` - runs TypeScript.
- `pnpm test` - run unit tests.
- `pnpm test:ci` - run all unit and integration tests in CI mode.
- `pnpm test:e2e` - run all e2e tests with the Cypress Test Runner.
- `pnpm test:e2e:headless` - run all e2e tests headlessly.
- `pnpm test:e2e:ci` - run all e2e tests for CI Environment.
- `pnpm coverage:jest` - open the coverage report in the browser for jest.
- `pnpm coverage:cypress` - open the coverage report in the browser for cypress.
- `pnpm validate` - runs `lint`, `test:ci` and `test:e2e:ci`.
