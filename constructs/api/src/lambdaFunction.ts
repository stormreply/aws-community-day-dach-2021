import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

export class FizzBuzzCheckFunction extends NodejsFunction {
  constructor(scope: Construct) {
    super(scope, 'FizzBuzzCheck', {
      logRetention: RetentionDays.ONE_WEEK,
      runtime: Runtime.NODEJS_14_X,
    });
  }
}
