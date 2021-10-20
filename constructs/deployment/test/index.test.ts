import { App, Stack } from 'aws-cdk-lib';

import '@aws-cdk/assert/jest';

import { DeploymentStack } from '../src';

describe('deployment stack', () => {
  let stack: Stack;

  beforeAll(() => {
    stack = new DeploymentStack(new Stack(new App()), 'Deployment');
  });

  describe('custom cdk bucket deployment', () => {
    test('lambda function', () => {
      expect(stack).toHaveResource('AWS::Lambda::Function', {
        Handler: 'index.handler',
        Layers: [
          {
            Ref: 'FrontendBucketDeploymentAwsCliLayer7733A4D2',
          },
        ],
        Role: {
          'Fn::GetAtt': ['CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRole89A01265', 'Arn'],
        },
        Runtime: 'python3.7',
        Timeout: 900,
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

    test('role policy', () => {
      expect(stack).toHaveResource('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: [
            {
              Action: ['s3:GetObject*', 's3:GetBucket*', 's3:List*'],
              Effect: 'Allow',
              Resource: [
                {
                  'Fn::Join': [
                    '',
                    [
                      'arn:',
                      {
                        Ref: 'AWS::Partition',
                      },
                      ':s3:::',
                      {
                        // eslint-disable-next-line no-template-curly-in-string
                        'Fn::Sub': 'cdk-hnb659fds-assets-${AWS::AccountId}-${AWS::Region}',
                      },
                    ],
                  ],
                },
                {
                  'Fn::Join': [
                    '',
                    [
                      'arn:',
                      {
                        Ref: 'AWS::Partition',
                      },
                      ':s3:::',
                      {
                        // eslint-disable-next-line no-template-curly-in-string
                        'Fn::Sub': 'cdk-hnb659fds-assets-${AWS::AccountId}-${AWS::Region}',
                      },
                      '/*',
                    ],
                  ],
                },
              ],
            },
            {
              Action: ['s3:GetObject*', 's3:GetBucket*', 's3:List*', 's3:DeleteObject*', 's3:PutObject', 's3:Abort*'],
              Effect: 'Allow',
              Resource: [
                {
                  'Fn::GetAtt': ['FrontendBucketEFE2E19C', 'Arn'],
                },
                {
                  'Fn::Join': [
                    '',
                    [
                      {
                        'Fn::GetAtt': ['FrontendBucketEFE2E19C', 'Arn'],
                      },
                      '/*',
                    ],
                  ],
                },
              ],
            },
            {
              Action: ['cloudfront:GetInvalidation', 'cloudfront:CreateInvalidation'],
              Effect: 'Allow',
              Resource: '*',
            },
          ],
          Version: '2012-10-17',
        },
        PolicyName: 'CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRoleDefaultPolicy88902FDF',
        Roles: [
          {
            Ref: 'CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRole89A01265',
          },
        ],
      });
    });
  });

  describe('frontend bucket deployment', () => {
    test('lambda layer version', () => {
      expect(stack).toHaveResource('AWS::Lambda::LayerVersion', {});
    });

    test('custom resource', () => {
      expect(stack).toHaveResource('Custom::CDKBucketDeployment', {
        DestinationBucketName: {
          Ref: 'FrontendBucketEFE2E19C',
        },
        DistributionId: {
          Ref: 'FrontendCloudFrontWebDistribution0A49D91F',
        },
        DistributionPaths: ['/*'],
        Prune: true,
        ServiceToken: {
          'Fn::GetAtt': ['CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756C81C01536', 'Arn'],
        },
        SourceBucketNames: [
          {
            // eslint-disable-next-line no-template-curly-in-string
            'Fn::Sub': 'cdk-hnb659fds-assets-${AWS::AccountId}-${AWS::Region}',
          },
        ],
      });
    });
  });

  describe('frontend bucket', () => {
    test('bucket', () => {
      expect(stack).toHaveResource('AWS::S3::Bucket', {
        WebsiteConfiguration: {
          IndexDocument: 'index.html',
        },
      });
    });

    test('policy', () => {
      expect(stack).toHaveResource('AWS::S3::BucketPolicy', {
        Bucket: {
          Ref: 'FrontendBucketEFE2E19C',
        },
        PolicyDocument: {
          Statement: [
            {
              Action: 's3:GetObject',
              Effect: 'Allow',
              Principal: {
                AWS: '*',
              },
              Resource: {
                'Fn::Join': [
                  '',
                  [
                    {
                      'Fn::GetAtt': ['FrontendBucketEFE2E19C', 'Arn'],
                    },
                    '/*',
                  ],
                ],
              },
            },
          ],
          Version: '2012-10-17',
        },
      });
    });
  });

  describe('frontend distribution', () => {
    test('cloudfront distribution', () => {
      expect(stack).toHaveResource('AWS::CloudFront::Distribution', {
        DistributionConfig: {
          DefaultCacheBehavior: {
            AllowedMethods: ['GET', 'HEAD', 'OPTIONS'],
            CachePolicyId: '658327ea-f89d-4fab-a63d-7e88639e58f6',
            Compress: true,
            OriginRequestPolicyId: '88a5eaf4-2fd4-4709-b370-b4c650ea3fcf',
            TargetOriginId: 'DeploymentFrontendCloudFrontWebDistributionOrigin1398A4D9E',
            ViewerProtocolPolicy: 'redirect-to-https',
          },
          Enabled: true,
          HttpVersion: 'http2',
          IPV6Enabled: true,
          Origins: [
            {
              CustomOriginConfig: {
                OriginProtocolPolicy: 'http-only',
                OriginSSLProtocols: ['TLSv1.2'],
              },
              DomainName: {
                'Fn::Select': [
                  2,
                  {
                    'Fn::Split': [
                      '/',
                      {
                        'Fn::GetAtt': ['FrontendBucketEFE2E19C', 'WebsiteURL'],
                      },
                    ],
                  },
                ],
              },
              Id: 'DeploymentFrontendCloudFrontWebDistributionOrigin1398A4D9E',
            },
          ],
        },
      });
    });
  });
});
