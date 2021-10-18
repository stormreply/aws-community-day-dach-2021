import { NestedStack, NestedStackProps } from "aws-cdk-lib";
import { IDistribution } from "aws-cdk-lib/aws-cloudfront";
import { IBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

import * as path from "path";

import { FrontendBucket } from "./bucket";
import { FrontendBucketDeployment } from "./bucket-deployment";
import { FrontendCloudFrontWebDistribution } from "./distribution";

export class DeploymentStack extends NestedStack {
  public readonly bucket: IBucket;
  public readonly distribution: IDistribution;

  constructor(scope: Construct, id: string, props?: NestedStackProps) {
    super(scope, id, props);

    this.bucket = new FrontendBucket(this, "FrontendBucket");

    this.distribution = new FrontendCloudFrontWebDistribution(
      this,
      "FrontendCloudFrontWebDistribution",
      {
        bucket: this.bucket,
      }
    );

    new FrontendBucketDeployment(this, "FrontendBucketDeployment", {
      destinationBucket: this.bucket,
      distribution: this.distribution,
      source: path.join(process.cwd(), "../../packages/frontend/dist"),
    });
  }
}
