import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "@/styles/Home.module.css";

import { CourseInfo, RegisteredCourse } from "@/types";
import { Courses } from "@/types/RegisteredCourse";
import { FaCopyright, FaGear, FaGolang, FaJava, FaJs, FaPython, FaRust, FaSwift } from "react-icons/fa6";
import { SiCplusplus, SiCsharp, SiHaskell, SiJulia, SiLua, SiPerl, SiPhp, SiR, SiRuby, SiTypescript } from "react-icons/si";
import { dialogHandler } from "@/components/QuestionDisplay/QuestionDisplay";
import Skeleton from "react-loading-skeleton";

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

	const [regData, setRegData] = useState<RegisteredCourse | null>(null); // Registered Course

	const [courseId, setCourseId] = useState("11|C"); // The course they currently working on
	const [user, setUser] = useState('')

	useEffect(() => {
		const us = localStorage.getItem("userid");
		if (!us) router.push("/login");
		else {
			setUser(us)
			fetch("/api/getreg?user=" + us)
				.then((d) => d.json())
				.then((a) => {
					setRegData(a);
				});
		}

		const settings = document.getElementById("settings") as HTMLDialogElement;

		settings?.addEventListener("click", (e: any) => {
			dialogHandler(e);
		});
	}, []);

	return (
		<>
			<header>
				<h1>Better-Lab</h1>
			</header>
			<main>
				<dialog className={styles.dialog} id="settings" style={{ paddingBottom: "24px !important" }}>
					<div className="container d-flex flex-column justify-content-around">
						<div className="row">
							<h1>Settings</h1>
						</div>
						<div className="row d-flex">
							<form
								style={{ padding: 0, gap: 8 }}
								method="dialog"
								className="container d-flex flex-column"
							>
								<div className={styles.settingFlex}>

									<div style={{ display: "flex", gap: 8 }}>
										{user && <input
											style={{
												opacity: 0.9,
												color: "#b1b1b1",
												cursor: "not-allowed",
											}}
											disabled={true}
											className="col-12 p-2"
											pattern="[0-9]{12}"
											value={user}
										/>}
										<button
											className={styles.logout}
											onClick={() => {
												localStorage.setItem("userid", "");
												router.push("/login");
											}}
										>
											Logout
										</button>
									</div>
									<div style={{ display: "flex", gap: 8, alignItems: "center" }}>
										<p style={{ margin: 0, color: "var(--level-text)" }}>Course: </p>
										<select value={courseId} onChange={(e) => {
											localStorage.setItem('course', e.target.value)
											setCourseId(e.target.value)
										}}>
											{regData &&
												regData.courses.map(
													(
														el: { COURSE_ID: number; COURSE_NAME: string },
														index: number,
													) => {
														return (
															<option
																style={{ textTransform: "capitalize" }}
																key={index}
																value={`${el.COURSE_ID}|${el.COURSE_NAME}`}
															>
																{el.COURSE_NAME.toLowerCase()}
															</option>
														);
													},
												)}
										</select>
									</div>
								</div>
							</form>
						</div>

					</div>
				</dialog>

				<div className={styles.registered}>

					<h2>Registered Courses</h2>
					<button
						className={styles.closebutton}
						type="button"
						style={{
							display: "flex",
							alignItems: "center",
							borderWidth: 1.8,
							padding: "8px 12px",
							fontSize: 18,
						}}
						onClick={() =>
							(
								document.getElementById("settings") as HTMLDialogElement
							).showModal()
						}
						title="Settings"
					>
						<FaGear />
					</button>

				</div>
				<div className={styles.grid}>
					{regData ?
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
												<p style={el.LEVEL1 == 100 ? { color: "var(--green)" } : {}}>{el.LEVEL1}<span>/100</span></p>
												<div className={styles.progress}><div style={{ width: `${el.LEVEL1}%` }}></div></div>
											</div>
											<div className={styles.levelIndicator}>

												<p style={el.LEVEL2 == 100 ? { color: "var(--green)" } : {}}>{el.LEVEL2}<span>/100</span></p>
												<div className={styles.progress}><div style={{ width: `${el.LEVEL2}%` }}></div></div>

											</div>
											<div className={styles.levelIndicator}>

												<p style={el.LEVEL3 == 100 ? { color: "var(--green)" } : {}}>{el.LEVEL3}<span>/100</span></p>
												<div className={styles.progress}><div style={{ width: `${el.LEVEL3}%` }}></div></div>

											</div>
										</div>
									</div>
								);
							},
						) : (
							<>
								<Skeleton style={{ borderRadius: 16 }} height={160} width={"100%"} />
								<Skeleton style={{ borderRadius: 16 }} height={160} width={"100%"} />
								<Skeleton style={{ borderRadius: 16 }} height={160} width={"100%"} />
								<Skeleton style={{ borderRadius: 16 }} height={160} width={"100%"} />
							</>
						)}
				</div>
			</main>
		</>
	);
}
