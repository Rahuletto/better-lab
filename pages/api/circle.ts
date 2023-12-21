import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.query;

  const json = {
    info: {
      USER_ID: '401123438381',
      ROLE: 'S',
      Status: 1,
    },
    course: {
      USER_ID: '401123438381',
      COURSE_ID: 14,
      COURSE_NAME: 'PYTHON',
    },
    KEY: 'john',
  };
  const JSONdata = JSON.stringify(json);

  fetch(
    'https://dld.srmist.edu.in/ktretelab2023/elabserver/ict/student/courseview/getcourseinfo',
    {
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
  )
    .then((dt) => dt.json())
    .then((data) => {
      res.status(200).json(data);
    });
}
