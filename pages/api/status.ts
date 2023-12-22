import { NextRequest } from 'next/server';

export default async function GET(req: NextRequest) {
  if (req.method != 'GET')
    return new Response(
      JSON.stringify({
        message: 'Invaid Method ! EXPECTED: GET method.',
        status: 405,
      }),
      {
        status: 405,
        headers: {
          'content-type': 'application/json',
        },
      }
    );

  const r = await fetch(
    'https://dld.srmist.edu.in/ktretelab2023/elabserver/ict/checkstatus',
    {
      method: 'POST',
      body: JSON.stringify({ KEY: "john" }),
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
