import { NextRequest } from 'next/server';

export default async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);

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
      },
    );

  const id = String(searchParams.get('id'));
  const user = String(searchParams.get('user'));
  const server = String(searchParams.get('server')) || 'ktretelab2023';

  if (!id || !user)
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

  const { course }: { course: { id: number; name: string } } = await req.json();
  if (!course)
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

  const json = {
    ROLE: 'S',
    info: {
      USER_ID: user,
      ROLE: 'S',
    },
    course: {
      USER_ID: user,
      COURSE_ID: Number(course.id),
      COURSE_NAME: course.name,
    },
    SEQUENCE_ID: Number(id),
    KEY: 'john',
  };

  const JSONdata = JSON.stringify(json);

  const url = server.startsWith('rmp') ? 'srmrmp' : 'srmist';

  const r = await fetch(
    `https://dld.${url}.edu.in/${server}/elabserver/ict/student/questionview/getinfo`,
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
