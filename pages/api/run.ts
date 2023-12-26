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
      }
    );

  const id = String(searchParams.get('id'));
  const user = String(searchParams.get('user'));

  const server = String(searchParams.get('server')) || "ktretelab2023";

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

  const {
    code,
    language,
    qid,
    course,
  }: {
    code: string;
    language: string;
    qid: string;
    course: { name: string; id: number };
  } = await req.json();

  if (!code || !language || !qid || !course)
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

  const url = server.startsWith('rmp') ? 'srmrmp' : 'srmist';

  const json = {
    language: language,
    input: '0',
    code: code,
    type: 'regular',
    compileType: 'evaluate',
    'api-key': 'transtar',
    student_id: 'Class' + user,
    userid: user,
  };

  const JSONdata = JSON.stringify(json);

  const runJSON = {
    info: {
      USER_ID: user,
      ROLE: 'S',
      Status: 1,
    },
    studentData: {
      COURSE_ID: course.id,
      Q_ID: qid,
      SEQUENCE_ID: Number(id),
      COURSE_NAME: course.name,
    },
    tempCode: code,
    code: [
      {
        value: code,
        mode: 0,
      },
    ],
    compilez: `https://dld.${url}.edu.in/${server}/compiler`,
    language: language,
    student_id: 'Class' + user,
    KEY: 'john',
    ictserver: `https://dld.${url}.edu.in/${server}/elabserver`,
  };

  const runJSONData = JSON.stringify(runJSON);

  const e = await fetch(
    `https://dld.${url}.edu.in/${server}/elabserver/ict/student/questionview/savelogs`,
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
    }
  );

  const response = await fetch(
    `https://dld.${url}.edu.in/${server}/elabserver/ict/student/questionview/evaluate`,
    {
      method: 'POST',
      body: runJSONData,
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
