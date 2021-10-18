[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![cdk](https://img.shields.io/badge/built%20with-cdk-%23ec7211)](https://aws.amazon.com/cdk/)

# AWS Community Day DACH 2021

This is the example project for the presentation "The anatomy of a larger scale CDK project" at the AWS Community Day DACH 2021.

This project demonstrates how you can structure and build a larger scale CDK application in TypeScript including a web frontend inside a monorepo and completely automated ci/cd.

## Requirements

Please use the latest stable node version to work with this project.
If you need older versions of node and npm in other projects you can use [Node Version Manager](https://github.com/nvm-sh/nvm) to switch whenever you like. The project contains an `.nvmrc` file which automatically triggers nvm once you configured the [deeper shell integration](https://github.com/nvm-sh/nvm#deeper-shell-integration)

The project uses [Yarn](https://yarnpkg.com) as a package manager. Please install it globally `npm install -g yarn` before doing anything else.

## Getting started

To start the Development, try to run `yarn run setup` in the root project.
This command will run yarn install on the root project and afterwards on all packages via lerna to create links for cross-package-dependencies.

See [Lerna Bootstrap Documentation](https://github.com/lerna/lerna/tree/master/commands/bootstrap#readme) for more information.
