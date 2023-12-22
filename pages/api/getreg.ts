import { NextRequest } from 'next/server';

export default async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

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

  const user = String(searchParams.get('user'));
  const server = String(searchParams.get('server')) || "ktretelab2023";

  if (!user)
    return new Response(
      JSON.stringify({
        error: 'Missing query arguments',
        status: 400,
        reason:
          'The server cannot or will not process the request due to something that is perceived to be a client error',
      }),
      {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      }
    );

  const json = {
    info: {
      USER_ID: user,
      ROLE: 'S',
    },
    KEY: 'john',
  };

  const JSONdata = JSON.stringify(json);

  const url = server.startsWith("rmp") ? "srmrmp" : "srmist"

  const r = await fetch(
    `https://dld.${url}.edu.in/${server}/elabserver/ict/student/home/registeredcourses`,
    {
      cache: 'force-cache',
      method: 'POST',
      body: JSONdata,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `https://dld.${url}.edu.in`,
        Referer: `https://dld.${url}.edu.in/${server}/`,
        Origin: `https://dld.${url}.edu.in`,
        Host: `dld.${url}.edu.in`,
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
