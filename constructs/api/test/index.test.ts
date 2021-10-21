import { App, Stack } from 'aws-cdk-lib';

import '@aws-cdk/assert/jest';

import { ApiStack } from '../src';

describe('api stack', () => {
  let stack: Stack;

  beforeAll(() => {
    stack = new ApiStack(new Stack(new App()), 'Api');
  });

  describe('fizz buzz', () => {
    test('lambda function', () => {
      expect(stack).toHaveResource('AWS::Lambda::Function', {
        Role: {
          'Fn::GetAtt': ['FizzBuzzCheckServiceRole3B2B861F', 'Arn'],
        },
        Environment: {
          Variables: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
          },
        },
        Handler: 'index.handler',
        Runtime: 'nodejs14.x',
      });
    });

    test('service role', () => {
      expect(stack).toHaveResource('AWS::IAM::Role', {
        AssumeRolePolicyDocument: {
          Statement: [
            {
              Action: 'sts:AssumeRole',
              Effect: 'Allow',
              Principal: {
                Service: 'lambda.amazonaws.com',
              },
            },
          ],
          Version: '2012-10-17',
        },
        ManagedPolicyArns: [
          {
            'Fn::Join': [
              '',
              [
                'arn:',
                {
                  Ref: 'AWS::Partition',
                },
                ':iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
              ],
            ],
          },
        ],
      });
    });

    test('rest api', () => {
      expect(stack).toHaveResource('AWS::ApiGateway::RestApi', {
        Name: 'FizzBuzz',
      });
    });

    test('account', () => {
      expect(stack).toHaveResource('AWS::ApiGateway::Account', {
        CloudWatchRoleArn: {
          'Fn::GetAtt': ['FizzBuzzCloudWatchRole45CCEA43', 'Arn'],
        },
      });
    });

    test('cloudwatch role', () => {
      expect(stack).toHaveResource('AWS::IAM::Role', {
        AssumeRolePolicyDocument: {
          Statement: [
            {
              Action: 'sts:AssumeRole',
              Effect: 'Allow',
              Principal: {
                Service: 'apigateway.amazonaws.com',
              },
            },
          ],
          Version: '2012-10-17',
        },
        ManagedPolicyArns: [
          {
            'Fn::Join': [
              '',
              [
                'arn:',
                {
                  Ref: 'AWS::Partition',
                },
                ':iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs',
              ],
            ],
          },
        ],
      });
    });
    test('deployment', () => {
      expect(stack).toHaveResource('AWS::ApiGateway::Deployment', {
        RestApiId: {
          Ref: 'FizzBuzz2992F36F',
        },
        Description: 'Automatically created by the RestApi construct',
      });
    });

    test('stage', () => {
      expect(stack).toHaveResource('AWS::ApiGateway::Stage', {
        RestApiId: {
          Ref: 'FizzBuzz2992F36F',
        },
        DeploymentId: {
          Ref: 'FizzBuzzDeploymentA62385A78c85dec46df9b0a1dccad6114273e611',
        },
        StageName: 'prod',
      });
    });

    test('resource', () => {
      expect(stack).toHaveResource('AWS::ApiGateway::Resource', {
        ParentId: {
          'Fn::GetAtt': ['FizzBuzz2992F36F', 'RootResourceId'],
        },
        PathPart: 'check',
        RestApiId: {
          Ref: 'FizzBuzz2992F36F',
        },
      });
    });

    test('method', () => {
      expect(stack).toHaveResource('AWS::ApiGateway::Method', {
        HttpMethod: 'POST',
        ResourceId: {
          Ref: 'FizzBuzzcheck255A0728',
        },
        RestApiId: {
          Ref: 'FizzBuzz2992F36F',
        },
        AuthorizationType: 'NONE',
        Integration: {
          IntegrationHttpMethod: 'POST',
          Type: 'AWS_PROXY',
          Uri: {
            'Fn::Join': [
              '',
              [
                'arn:',
                {
                  Ref: 'AWS::Partition',
                },
                ':apigateway:',
                {
                  Ref: 'AWS::Region',
                },
                ':lambda:path/2015-03-31/functions/',
                {
                  'Fn::GetAtt': ['FizzBuzzCheck05802674', 'Arn'],
                },
                '/invocations',
              ],
            ],
          },
        },
      });
    });

    test('test permission', () => {
      expect(stack).toHaveResource('AWS::Lambda::Permission', {
        Action: 'lambda:InvokeFunction',
        FunctionName: {
          'Fn::GetAtt': ['FizzBuzzCheck05802674', 'Arn'],
        },
        Principal: 'apigateway.amazonaws.com',
        SourceArn: {
          'Fn::Join': [
            '',
            [
              'arn:',
              {
                Ref: 'AWS::Partition',
              },
              ':execute-api:',
              {
                Ref: 'AWS::Region',
              },
              ':',
              {
                Ref: 'AWS::AccountId',
              },
              ':',
              {
                Ref: 'FizzBuzz2992F36F',
              },
              '/test-invoke-stage/POST/check',
            ],
          ],
        },
      });
    });

    test('permission', () => {
      expect(stack).toHaveResource('AWS::Lambda::Permission', {
        Action: 'lambda:InvokeFunction',
        FunctionName: {
          'Fn::GetAtt': ['FizzBuzzCheck05802674', 'Arn'],
        },
        Principal: 'apigateway.amazonaws.com',
        SourceArn: {
          'Fn::Join': [
            '',
            [
              'arn:',
              {
                Ref: 'AWS::Partition',
              },
              ':execute-api:',
              {
                Ref: 'AWS::Region',
              },
              ':',
              {
                Ref: 'AWS::AccountId',
              },
              ':',
              {
                Ref: 'FizzBuzz2992F36F',
              },
              '/',
              {
                Ref: 'FizzBuzzDeploymentStageprod5A7C52A7',
              },
              '/POST/check',
            ],
          ],
        },
      });
    });
  });

  describe('log retention', () => {
    test('custom resource', () => {
      expect(stack).toHaveResource('Custom::LogRetention', {
        ServiceToken: {
          'Fn::GetAtt': ['LogRetentionaae0aa3c5b4d4f87b02d85b201efdd8aFD4BFC8A', 'Arn'],
        },
        LogGroupName: {
          'Fn::Join': [
            '',
            [
              '/aws/lambda/',
              {
                Ref: 'FizzBuzzCheck05802674',
              },
            ],
          ],
        },
        RetentionInDays: 7,
      });
    });

    test('role', () => {
      expect(stack).toHaveResource('AWS::IAM::Role', {
        AssumeRolePolicyDocument: {
          Statement: [
            {
              Action: 'sts:AssumeRole',
              Effect: 'Allow',
              Principal: {
                Service: 'lambda.amazonaws.com',
              },
            },
          ],
          Version: '2012-10-17',
        },
        ManagedPolicyArns: [
          {
            'Fn::Join': [
              '',
              [
                'arn:',
                {
                  Ref: 'AWS::Partition',
                },
                ':iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
              ],
            ],
          },
        ],
      });
    });

    test('policy', () => {
      expect(stack).toHaveResource('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: [
            {
              Action: ['logs:PutRetentionPolicy', 'logs:DeleteRetentionPolicy'],
              Effect: 'Allow',
              Resource: '*',
            },
          ],
          Version: '2012-10-17',
        },
        PolicyName: 'LogRetentionaae0aa3c5b4d4f87b02d85b201efdd8aServiceRoleDefaultPolicyADDA7DEB',
        Roles: [
          {
            Ref: 'LogRetentionaae0aa3c5b4d4f87b02d85b201efdd8aServiceRole9741ECFB',
          },
        ],
      });
    });

    test('lambda function', () => {
      expect(stack).toHaveResource('AWS::Lambda::Function', {
        Handler: 'index.handler',
        Runtime: 'nodejs14.x',
        Role: {
          'Fn::GetAtt': ['LogRetentionaae0aa3c5b4d4f87b02d85b201efdd8aServiceRole9741ECFB', 'Arn'],
        },
      });
    });
  });
});
