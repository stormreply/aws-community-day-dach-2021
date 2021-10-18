import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { DeploymentStack } from '@stormreply/aws-community-day-dach-2021-deployment';

export class BackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const {
      bucket,
      distribution: { distributionDomainName },
    } = new DeploymentStack(this, 'Deployment');

    new CfnOutput(this, 'distributionDomainName', {
      value: distributionDomainName,
    });

    new CfnOutput(this, 'frontendBucketName', {
      value: bucket.bucketName,
    });

    new CfnOutput(this, 'region', {
      value: this.region,
    });
  }
}
