import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return { body: 'No number!', statusCode: 400 };
  }

  const body = JSON.parse(event.body);
  const number = body.number;

  let outputString;

  if (number % 3 === 0 && number % 5 === 0) {
    outputString = 'fizzbuzz';
  } else if (number % 3 === 0) {
    outputString = 'fizz';
  } else if (number % 5 === 0) {
    outputString = 'buzz';
  } else {
    outputString = 'Not matching';
  }

  return { body: outputString, statusCode: 200 };
};
