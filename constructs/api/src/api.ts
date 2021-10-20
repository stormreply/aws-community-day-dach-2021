import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export interface FizzBuzzApiProps {
  readonly handler: IFunction;
}

export class FizzBuzzApi extends LambdaRestApi {
  constructor(scope: Construct, props: FizzBuzzApiProps) {
    const { handler } = props;
    super(scope, 'FizzBuzz', {
      handler,
      proxy: false,
    });

    this.root.addResource('check').addMethod('POST');
  }
}
