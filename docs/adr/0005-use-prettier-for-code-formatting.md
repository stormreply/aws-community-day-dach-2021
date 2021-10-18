# 5. Use Prettier for code formatting

Date: 2021-10-18

## Status

Accepted

## Context

Prettier is an opinionated code formatter with support for:

- JavaScript (including experimental features)
- JSX
- Angular
- Vue
- Flow
- TypeScript
- CSS, Less, and SCSS
- HTML
- JSON
- GraphQL
- Markdown, including GFM and MDX
- YAML

It removes nearly all original styling and ensures that all outputted code conforms to a consistent style. (See this [blog post](https://archive.jlongster.com/A-Prettier-Formatter))

## Decision

We will use Prettier as described here https://prettier.io

## Consequences

In addition to the formatter we will use the following tools for an even better integration.

- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
- [lint-staged](https://github.com/okonet/lint-staged)
