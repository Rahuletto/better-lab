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
      }
    );

  const id = String(searchParams.get('id'));
  const user = String(searchParams.get('user'));

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
      }
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
      }
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

  const r = await fetch(
    'https://dld.srmist.edu.in/ktretelab2023/elabserver/ict/student/questionview/getinfo',
    {
      cache: 'force-cache',
      method: 'POST',
      body: JSONdata,
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
