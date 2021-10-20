import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as lambdaTester from 'lambda-tester';

import { handler } from '../src/lambdaFunction.FizzBuzzCheck';

describe('Fizz Buzz API handler', function () {
  test('verifies not matching response', async () => {
    return lambdaTester(handler)
      .event({ body: JSON.stringify({ number: 22 }) } as unknown as APIGatewayProxyEvent)
      .expectResult((result: APIGatewayProxyResult) => {
        expect(result).toStrictEqual({ body: 'Not matching', statusCode: 200 });
      });
  });

  test('verifies fizzbuzz response', async () => {
    return lambdaTester(handler)
      .event({ body: JSON.stringify({ number: 15 }) } as unknown as APIGatewayProxyEvent)
      .expectResult((result: APIGatewayProxyResult) => {
        expect(result).toStrictEqual({ body: 'fizzbuzz', statusCode: 200 });
      });
  });

  test('verifies fizz response', async () => {
    return lambdaTester(handler)
      .event({ body: JSON.stringify({ number: 21 }) } as unknown as APIGatewayProxyEvent)
      .expectResult((result: APIGatewayProxyResult) => {
        expect(result).toStrictEqual({ body: 'fizz', statusCode: 200 });
      });
  });

  test('verifies buzz response', async () => {
    return lambdaTester(handler)
      .event({ body: JSON.stringify({ number: 25 }) } as unknown as APIGatewayProxyEvent)
      .expectResult((result: APIGatewayProxyResult) => {
        expect(result).toStrictEqual({ body: 'buzz', statusCode: 200 });
      });
  });

  test('verifies empty body response', async () => {
    return lambdaTester(handler)
      .event({} as unknown as APIGatewayProxyEvent)
      .expectResult((result: APIGatewayProxyResult) => {
        expect(result).toStrictEqual({ body: 'No number!', statusCode: 400 });
      });
  });
});
