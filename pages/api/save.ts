import { NextRequest } from 'next/server';

export default async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  if (req.method !== 'POST')
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
      },
    );

  const id = Number(searchParams.get('id'));
  const user = String(searchParams.get('user'));
  const cid = Number(searchParams.get('cid'));

  const server = String(searchParams.get('server')) || 'ktretelab2023';

  if (!id || !user || !cid)
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
      },
    );

  const {
    code,
  }: {
    code: string;
  } = await req.json();

  if (!code)
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
      },
    );

  const url = server.startsWith('rmp') ? 'srmrmp' : 'srmist';

  const json = {
    info: {
      USER_ID: user,
      ROLE: 'S',
      Status: 1,
    },
    COURSE_ID: cid,
    SEQUENCE_ID: Number(id),
    CODE: [{ value: code.toString(), mode: 0 }],
    KEY: 'john',
  };

  const JSONdata = JSON.stringify(json);

  const response = await fetch(
    `https://dld.${url}.edu.in/${server}/elabserver/ict/student/questionview/saveinfo`,
    {
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
    },
  );
  const data = await response.json();

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
