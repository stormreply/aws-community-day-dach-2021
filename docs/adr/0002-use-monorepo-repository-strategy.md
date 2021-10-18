# 2. Use monorepo repository strategy

Date: 2021-10-18

## Status

Accepted

## Context

Splitting up large codebases into separate independently versioned packages is extremely useful for code sharing. However, making changes across many repositories is messy and difficult to track, and testing across repositories gets complicated really fast.

To solve these (and many other) problems, some projects will organize their codebases into multi-package repositories.

## Decision

We will use a monorepo repository strategy.

## Consequences

In addition to the monorepo strategy we will use tooling to ensure the proper use.

- [Lerna](https://lerna.js.org)
