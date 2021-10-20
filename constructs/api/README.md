# AWS Community Day DACH 2021 - API

An AWS CDK construct which deploys an rest api nested stack.

## Usage

### TypeScript

Add to your CDK stack:

```ts
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { ApiStack } from '@stormreply/aws-community-day-dach-2021-api';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new ApiStack(this, 'Api');
  }
}
```
