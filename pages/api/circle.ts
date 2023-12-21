import { CourseInfo } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { user } = req.query;
  const { course }: {course : {id: number, name: string}} = JSON.parse(req.body);

  if(!user) return res.status(400).json({ error: "Missing query arguments", status: 400, reason: "The server cannot or will not process the request due to something that is perceived to be a client error" })
  if(!course) return res.status(400).json({ error: "Missing body arguments", status: 400, reason: "The server cannot or will not process the request due to something that is perceived to be a client error" })


	const json = {
		info: {
			USER_ID: user,
			ROLE: "S",
			Status: 1,
		},
		course: {
			USER_ID: user,
			COURSE_ID: course.id,
			COURSE_NAME: course.name,
		},
		KEY: "john",
	};
	const JSONdata = JSON.stringify(json);

	fetch(
		"https://dld.srmist.edu.in/ktretelab2023/elabserver/ict/student/courseview/getcourseinfo",
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
	)
		.then((dt) => dt.json())
		.then((data: CourseInfo) => {
			res.status(200).json(data);
		});
}
