/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import fetch from 'node-fetch';
import { APIGatewayEvent } from 'aws-lambda';

interface Response {
  statusCode: number;
  body: string;
}

export async function handler(event: APIGatewayEvent): Promise<Response> {
  try {
    const params = event.pathParameters;
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Hello, World',
        params,
        data,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error?.message }),
    };
  }
}
