import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	// Get url query parameters
	const { user } = req.query;
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
	} = JSON.parse(req.body);

	if(!user) return res.status(400).json({ error: "Missing query arguments", status: 400, reason: "The server cannot or will not process the request due to something that is perceived to be a client error" })
    if(!code || !language || !qid || !course) return res.status(400).json({ error: "Missing body arguments", status: 400, reason: "The server cannot or will not process the request due to something that is perceived to be a client error" })


	const json = {
		language: language,
		input: "0",
		code: code,
		type: "regular",
		compileType: "evaluate",
		"api-key": "transtar",
		student_id: "Class" + user,
		userid: user,
	};

	const JSONdata = JSON.stringify(json);

	const runJSON = {
		info: {
			USER_ID: user,
			ROLE: "S",
			Status: 1,
		},
		studentData: {
			COURSE_ID: course.id,
			Q_ID: qid,
			SEQUENCE_ID: 293,
			COURSE_NAME: course.name,
		},
		tempCode: code,
		code: [
			{
				value: code,
				mode: 0,
			},
		],
		compilez: "https://dld.srmist.edu.in/ktretelab2023/compiler",
		language: language,
		student_id: "Class" + user,
		KEY: "john",
		ictserver: "https://dld.srmist.edu.in/ktretelab2023/elabserver",
	};

	const runJSONData = JSON.stringify(runJSON);

	fetch(
		"https://dld.srmist.edu.in/ktretelab2023/elabserver/ict/student/questionview/savelogs",
		{
			method: "POST",
			body: JSONdata,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "https://dld.srmist.edu.in",
				Referer: "https://dld.srmist.edu.in/ktretelab2023/",
				Origin: "https://dld.srmist.edu.in",
				Host: "dld.srmist.edu.in",
				"Sec-Fetch-Mode": "cors",
				"Sec-Fetch-Site": "same-origin",
			},
		},
	);

	const response = await fetch(
		"https://dld.srmist.edu.in/ktretelab2023/elabserver/ict/student/questionview/evaluate",
		{
			method: "POST",
			body: runJSONData,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "https://dld.srmist.edu.in",
				Referer: "https://dld.srmist.edu.in/ktretelab2023/",
				Origin: "https://dld.srmist.edu.in",
				Host: "dld.srmist.edu.in",
				"Sec-Fetch-Mode": "cors",
				"Sec-Fetch-Site": "same-origin",
			},
		},
	)
		.then((dt) => dt.json())
		.catch((error) => {
			res.json(error);
		});

	return new Promise<void>((resolve, reject) => {
		res.status(200).send(response);
		resolve();
	});
}
