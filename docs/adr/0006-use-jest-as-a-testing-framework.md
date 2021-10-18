# 6. Use Jest as a testing framework

Date: 2021-10-18

## Status

Accepted

## Context

Jest is a JavaScript testing framework designed to ensure correctness of any JavaScript codebase.
It allows us to write tests with an approachable, familiar and feature-rich API that gives us results quickly.

It can collect code coverage information from entire projects, including untested files and it provides a rich [Mock Functions](https://jestjs.io/docs/mock-functions) API.

It is well-documented, requires little configuration and can be extended to match our requirements.

## Decision

We will use Jest as described here https://jestjs.io

## Consequences

In addition to the testing framework we will use the following tools for an even better integration.

- [lint-staged](https://github.com/okonet/lint-staged)
