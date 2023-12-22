import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	// Get url query parameters
	const { user } = req.query;
	if(!user) return res.status(400).json({ error: "Missing query arguments", status: 400, reason: "The server cannot or will not process the request due to something that is perceived to be a client error" })

	const json = {
		info: {
			USER_ID: user,
			ROLE: "S",
		},
		KEY: "john",
	};

	const JSONdata = JSON.stringify(json);

	fetch(
		"https://dld.srmist.edu.in/ktretelab2023/elabserver/ict/student/home/registeredcourses",
		{
			cache: 'force-cache',
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
	)
		.then((dt) => dt.json())
		.then((data) => {
			res.status(200).json(data);
		});
}
