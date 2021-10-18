import { IDistribution } from "aws-cdk-lib/aws-cloudfront";
import { IBucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";

export interface FrontendBucketDeploymentProps {
  readonly destinationBucket: IBucket;
  readonly distribution: IDistribution;
  readonly source: string;
}

export class FrontendBucketDeployment extends BucketDeployment {
  constructor(
    scope: Construct,
    id: string,
    props: FrontendBucketDeploymentProps
  ) {
    const { destinationBucket, distribution, source } = props;
    super(scope, id, {
      sources: [Source.asset(source)],
      destinationBucket,
      distribution,
      distributionPaths: ["/*"],
    });
  }
}
