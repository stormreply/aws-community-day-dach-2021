# AWS Community Day DACH 2021 - Deployment

An AWS CDK construct which deploys a deployment nested stack.

## Usage

### TypeScript

Add to your CDK stack:

```ts
import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

import { DeploymentStack } from "@stormreply/aws-community-day-dach-2021-deployment";

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new DeploymentStack(this, "Deployment");
  }
}
```

See documentation for detailed information!
