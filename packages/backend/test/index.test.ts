import { App } from 'aws-cdk-lib';

import '@aws-cdk/assert/jest';

import { BackendStack } from '../lib';

describe('backend stack', () => {
  describe('nested stacks', () => {
    test('api', () => {
      const stack = new BackendStack(new App(), 'Backend');
      expect(stack).toHaveResource('AWS::CloudFormation::Stack', {});
    });

    test('deployment', () => {
      const stack = new BackendStack(new App(), 'Backend');
      expect(stack).toHaveResource('AWS::CloudFormation::Stack', {});
    });
  });

  test('outputs', () => {
    const stack = new BackendStack(new App(), 'Backend');
    expect(stack).toHaveOutput({
      outputName: 'distributionDomainName',
      outputValue: {
        'Fn::GetAtt': [
          'DeploymentNestedStackDeploymentNestedStackResource781006B0',
          'Outputs.BackendDeploymentFrontendCloudFrontWebDistributionDEDC1099DomainName',
        ],
      },
    });

    expect(stack).toHaveOutput({
      outputName: 'frontendBucketName',
      outputValue: {
        'Fn::GetAtt': [
          'DeploymentNestedStackDeploymentNestedStackResource781006B0',
          'Outputs.BackendDeploymentFrontendBucketEA0D1061Ref',
        ],
      },
    });

    expect(stack).toHaveOutput({
      outputName: 'region',
      outputValue: {
        Ref: 'AWS::Region',
      },
    });

    expect(stack).toHaveOutput({
      outputName: 'restApiEndpoint',
      outputValue: {
        'Fn::Join': [
          '',
          [
            'https://',
            {
              'Fn::GetAtt': ['ApiNestedStackApiNestedStackResourceD6AA1271', 'Outputs.BackendApiFizzBuzz9B647DB1Ref'],
            },
            '.execute-api.',
            {
              Ref: 'AWS::Region',
            },
            '.',
            {
              Ref: 'AWS::URLSuffix',
            },
            '/',
            {
              'Fn::GetAtt': [
                'ApiNestedStackApiNestedStackResourceD6AA1271',
                'Outputs.BackendApiFizzBuzzDeploymentStageprod16149FAFRef',
              ],
            },
            '/',
          ],
        ],
      },
    });
  });
});
