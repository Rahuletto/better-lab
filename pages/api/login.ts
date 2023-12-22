import { NextRequest } from 'next/server';

export default async function POST(req: NextRequest) {
  if (req.method != 'POST')
    return new Response(
      JSON.stringify({
        message: 'Invaid Method ! EXPECTED: POST method.',
        status: 405,
      }),
      {
        status: 405,
        headers: {
          'content-type': 'application/json',
        },
      }
    );

  const { user, pass } = await req.json();
  if (!pass || !user)
    return Response.json(
      {
        error: 'Missing body arguments',
        status: 400,
        reason:
          'The server cannot or will not process the request due to something that is perceived to be a client error',
      },
      {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      }
    );

  const json = { USER_ID: user, PASSWORD: pass, KEY: 'john' };

  const JSONdata = JSON.stringify(json);

  const r = await fetch(
    'https://dld.srmist.edu.in/ktretelab2023/elabserver/ict/login',
    {
      method: 'POST',
      body: JSONdata,
      cache: 'force-cache',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://dld.srmist.edu.in',
        Referer: 'https://dld.srmist.edu.in/ktretelab2023/',
        Origin: 'https://dld.srmist.edu.in',
        Host: 'dld.srmist.edu.in',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
      },
    }
  );
  const data = await r.json();
  return Response.json(data, {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });
}

export const config = {
  runtime: 'edge',
};
