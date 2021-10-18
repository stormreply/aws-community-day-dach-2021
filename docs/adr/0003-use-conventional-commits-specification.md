# 3. Use conventional commits specification

Date: 2021-10-18

## Status

Accepted

## Context

The Conventional Commits specification is a lightweight convention on top of commit messages. It provides an easy set of rules for creating an explicit commit history; which makes it easier to write automated tools on top of. This convention dovetails with SemVer, by describing the features, fixes, and breaking changes made in commit messages.

## Decision

We will use conventional commits as described here https://www.conventionalcommits.org

## Consequences

In addition to the specification we will use tooling to ensure the proper use.

- [Commitizen](https://commitizen-tools.github.io/commitizen/)
- [Commitlint](https://commitlint.js.org)
- [Husky](https://typicode.github.io/husky)
