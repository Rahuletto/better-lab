import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.query;

  const json = {
    info: {
      USER_ID: user,
      FIRST_NAME: 'RAHUL',
      LAST_NAME: 'MARBAN',
      MAIL_ID: 'rm1354@srmist.edu.in',
      MOBILE: '8248668008',
      ROLE: 'S',
      GENDER: 'MALE',
      REGISTER_NUMBER: 'RA2311026010101',
      DEPARTMENT: 'SCHOOL OF COMPUTING',
      Status: 1,
      iat: 1703063152,
      exp: 1703099152,
    },
    course: {
      _id: '11_127',
      USER_ID: '401123438381',
      USER_NAME: 'RAHUL MARBAN',
      COURSE_ID: 11,
      COURSE_NAME: 'C',
      TITLE: 'C PROGRAMMING',
      DEPARTMENT: 'SCHOOL OF COMPUTING',
      STATUS: 2,
      LEVEL1: 100,
      LEVEL2: 100,
      LEVEL3: 100,
      CERTIFIED_L1: 1,
      CERTIFIED_L2: 1,
      CERTIFIED_L3: 1,
      L1_DATE: 1699872472758,
      L2_DATE: 1701597185299,
      L3_DATE: 1701602471348,
      BATCH_ID: '11_127',
      BATCH_NAME: '103033_D1_AD1',
      batchid: 127,
      createdBy: '103033_1693313877860',
      key: '11_127',
      FACULTY_ID: '103033',
      FACULTY_NAME: 'MAIVIZHI R',
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
