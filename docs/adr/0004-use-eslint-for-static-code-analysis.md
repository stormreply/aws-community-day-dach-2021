# 4. Use ESLint for static code analysis

Date: 2021-10-18

## Status

Accepted

## Context

ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs. In many ways, it is similar to JSLint and JSHint with a few exceptions:

- ESLint uses Espree for JavaScript parsing.
- ESLint uses an AST to evaluate patterns in code.
- ESLint is completely pluggable, every single rule is a plugin and you can add more at runtime.

## Decision

We will use eslint as described here https://eslint.org

## Consequences

In addition to the linter we will use the following tools for an even better integration.

- [lint-staged](https://github.com/okonet/lint-staged)
