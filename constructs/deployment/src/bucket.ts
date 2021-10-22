import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class FrontendBucket extends Bucket {
  constructor(scope: Construct, id: string) {
    super(scope, id, {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
    });
  }
}
