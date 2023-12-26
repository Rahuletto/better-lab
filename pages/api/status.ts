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
  const { searchParams } = new URL(req.url);
  const server = String(searchParams.get('server')) || 'ktretelab2023';
  if (!server) return;
  const url = server.startsWith('rmp') ? 'srmrmp' : 'srmist';

  const controller = new AbortController();

  // 5 second timeout:

  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const r = await fetch(
      `https://dld.${url}.edu.in/${server}/elabserver/ict/checkstatus`,
      {
        signal: controller.signal,
        method: 'POST',
        body: JSON.stringify({ KEY: 'john' }),
        cache: 'force-cache',
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
    if (data) clearTimeout(timeoutId);

    return Response.json(data, {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (err: any) {
    return Response.json(
      { Status: 0, error: 'Offline' },
      {
        status: 522,
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  }
}

export const config = {
  runtime: 'edge',
};
