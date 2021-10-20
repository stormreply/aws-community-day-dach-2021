import { NestedStack, NestedStackProps } from 'aws-cdk-lib';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

import { FizzBuzzApi } from './api';
import { FizzBuzzCheckFunction } from './lambdaFunction';

export class ApiStack extends NestedStack {
  public readonly restApi: RestApi;

  constructor(scope: Construct, id: string, props?: NestedStackProps) {
    super(scope, id, props);

    const handler = new FizzBuzzCheckFunction(this);
    this.restApi = new FizzBuzzApi(this, { handler });
  }
}
