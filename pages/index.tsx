import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "@/styles/Home.module.css";

import { CourseInfo, RegisteredCourse } from "@/types";
import { Courses } from "@/types/RegisteredCourse";
import { FaCopyright, FaGolang, FaJava, FaJs, FaPython, FaRust, FaSwift } from "react-icons/fa6";
import { SiCplusplus, SiCsharp, SiHaskell, SiJulia, SiLua, SiPerl, SiPhp, SiR, SiRuby, SiTypescript } from "react-icons/si";

const icons = {
	C: <FaCopyright />,
	CPP: <SiCplusplus />,
	CSHARP: <SiCsharp />,
	GO: <FaGolang />,
	JULIA: <SiJulia />,
	PERL: <SiPerl />,
	HASKELL: <SiHaskell />,
	PYTHON: <FaPython />,
	JAVA: <FaJava />,
	JAVASCRIPT: <FaJs />,
	LUA: <SiLua />,
	PHP: <SiPhp />,
	RUBY: <SiRuby />,
	R: <SiR />,
	RUST: <FaRust />,
	SWIFT: <FaSwift />,
	TYPESCRIPT: <SiTypescript />

};

export default function Course() {
	const router = useRouter();

	const [courseData, setCourseData] = useState<CourseInfo | null>(null); // All course data (the wheel)
	const [regData, setRegData] = useState<RegisteredCourse | null>(null); // Registered Course

	const [courseId, setCourseId] = useState("11|C"); // The course they currently working on

	async function getCourseInfo(user: string) {
		return new Promise((resolve) => {
			const [id, l] = courseId.split("|");
			if (user) {
				fetch("/api/circle?user=" + user, {
					method: "POST",
					body: JSON.stringify({
						course: {
							name: l,
							id: Number(id),
						},
					}),
				})
					.then((d) => d.json())
					.then((a) => {
						setCourseData(a);
						resolve(true);
					});
			}
		});
	}

	useEffect(() => {
		const user = localStorage.getItem("userid");
		if (!user) router.push("/login");
		else {
			getCourseInfo(user);

			fetch("/api/getreg?user=" + user)
				.then((d) => d.json())
				.then((a) => {
					setRegData(a);
				});
		}
	}, []);

	return (
		<>
			<header>
				<h1>Better-Lab</h1>
			</header>
			<div className={styles.grid}>
				{regData &&
					regData.courses.map(
						(
							el: Courses,
							index: number,
						) => {
							return (
								<div
									style={el.LEVEL1 == 100 && el.LEVEL2 == 100 && el.LEVEL3 == 100 ? { border: "2px solid var(--green)" } : el.LEVEL1 == 100 ? { border: "2px solid var(--yellow)" } : { border: "2px solid transparent" }}
									className={styles.card}
									title={"Course: " + el.COURSE_NAME.charAt(0).toUpperCase() + el.COURSE_NAME.slice(1).toLowerCase()}
									key={index}
									onClick={() => {
										localStorage.setItem('course', `${el.COURSE_ID}|${el.COURSE_NAME}`)
										setCourseId(`${el.COURSE_ID}|${el.COURSE_NAME}`)
										router.push('/course')
									}}
								>
									{// @ts-ignore
										<div className={styles.text}> <h2>{icons[el.COURSE_NAME]}</h2>

											<p className={styles.title}>{el.COURSE_NAME.charAt(0).toUpperCase() + el.COURSE_NAME.slice(1).toLowerCase()}</p>
										</div>
									}

									<div className={styles.levels}>
										<div className={styles.levelIndicator}>
											<p style={el.LEVEL1 == 100 ? {color: "var(--green)"} : {}}>{el.LEVEL1}<span>/100</span></p>
											<div className={styles.progress}><div style={{ width: `${el.LEVEL1}%` }}></div></div>
										</div>
										<div className={styles.levelIndicator}>

											<p style={el.LEVEL2 == 100 ? {color: "var(--green)"} : {}}>{el.LEVEL2}<span>/100</span></p>
											<div className={styles.progress}><div style={{ width: `${el.LEVEL2}%` }}></div></div>

										</div>
										<div className={styles.levelIndicator}>

											<p style={el.LEVEL3 == 100 ? {color: "var(--green)"} : {}}>{el.LEVEL3}<span>/100</span></p>
											<div className={styles.progress}><div style={{ width: `${el.LEVEL3}%` }}></div></div>

										</div>
									</div>
								</div>
							);
						},
					)}
			</div>

		</>
	);
}
