/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import fetch from 'node-fetch';
import { APIGatewayEvent } from 'aws-lambda';
import cheerio from 'cheerio';

interface Response {
  statusCode: number;
  body: string;
}

interface Params {
  feedUrl: string;
}
export async function handler(event: APIGatewayEvent): Promise<Response> {
  try {
    const params: Params = event.queryStringParameters;
    console.log(params.feedUrl);

    const res = await fetch(params?.feedUrl);
    const text = await res.text();
    const $ = cheerio.load(text, { xmlMode: true, recognizeSelfClosing: true });
    const data = $('item')
      .map(function (_index: number, el) {
        const episode = $(el);
        return {
          id: episode.find('guid').text(),
          author: episode.find('author').text(),
          title: episode.find('title').text(),
          description: episode.find('description').text(),
          stream: episode.find('enclosure').attr('url'),
          duration: episode.find('itunes\\:duration').text(),
          number: +episode.find('itunes\\:episode').text() || 0,
          publishDate: episode.find('pubDate').text(),
        };
      })
      .get();
    return {
      statusCode: 200,
      body: JSON.stringify({
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
