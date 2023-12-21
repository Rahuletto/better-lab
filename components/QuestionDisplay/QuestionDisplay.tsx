import { useCallback, useEffect, useState } from "react";
import styles from "./QuestionDisplay.module.css";

import { CompileMsg } from "@/types/CompileMsg";
import { DataStream } from "@/types/DataStream";

import dynamic from "next/dynamic";
const CodeEditor = dynamic(
	() => import("../CodeEditor/Editor").then((mod) => mod.default),
	{ ssr: false },
);
const QuestionsProgress = dynamic(
	() =>
		import("@/components/QuestionsProgress/QuestionsProgress").then(
			(mod) => mod.default,
		),
	{ ssr: false },
);

import {
	FaAngleLeft,
	FaAngleRight,
	FaGear,
	FaSquareCheck,
} from "react-icons/fa6";

import { Languages } from "@/types/Languages";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { useRouter } from "next/router";
import { TbProgressBolt } from "react-icons/tb";

const Question = () => {
	const router = useRouter();

	const [num, setNum] = useState<number>(75);
	const [user, setUser] = useState<string>();
	const [data, setData] = useState<DataStream | null>(null);
	const [registered, setRegistered] = useState<any>(null);

	const [res, setRes] = useState<CompileMsg | null>(null);

	const [lang, setlang] = useState("C|11");

	const [code, setCode] = useState("");
	const [language, setLanguage] = useState(loadLanguage("c" as Languages));

	const [page, setPage] = useState(0);
	const [testpage, setTest] = useState(0);
	const [courseData, setCourseData] = useState<any>(null);

	const onChange = useCallback((value: string) => {
		if (num) localStorage.setItem("code-" + num, String(value));
		setCode(value);
		return;
	}, []);

	async function run() {
		if (!data) return;
		const box = document.getElementById("result");
		fetch("/api/run?user=" + user, {
			method: "POST",
			body: JSON.stringify({
				qid: data?.studentData.Q_ID,
				code: code,
				language: "c",
				course: {
					name: data?.questionData.COURSE_NAME,
					id: data?.studentData.COURSE_ID,
				},
			}),
		})
			.then((d) => d.json())
			.then((a) => {
				setRes(a);
				box?.scrollIntoView({ behavior: "smooth" });
			});
		return true;
	}

	function handleNextQuestionOnClick() {
		getCourseInfo().then((a) => {
			(document.getElementById("wheel") as HTMLDialogElement).showModal();
		});
	}
	async function getCourseInfo() {
		return new Promise((resolve) => {
			const [id, l] = lang.split("|");

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
		});
	}

	function dialogHandler(e: MouseEvent | any) {
		if (e.target?.tagName !== "DIALOG")
			//This prevents issues with forms
			return;

		const rect = e.target.getBoundingClientRect();

		const clickedInDialog =
			rect.top <= e.clientY &&
			e.clientY <= rect.top + rect.height &&
			rect.left <= e.clientX &&
			e.clientX <= rect.left + rect.width;

		if (clickedInDialog === false) e.target.close();
	}

	useEffect(() => {
		const us = localStorage.getItem("userid");
		if (!us) router.push("/login");
		else setUser(us);

		fetch("/api/getreg?user=" + user)
			.then((d) => d.json())
			.then((a) => {
				setRegistered(a);
			});

		const wheel = document.getElementById("wheel") as HTMLDialogElement;
		const settings = document.getElementById("settings") as HTMLDialogElement;

		wheel?.addEventListener("click", (e: any) => {
			dialogHandler(e);
		});
		settings?.addEventListener("click", (e: any) => {
			dialogHandler(e);
		});
	}, []);

	return (
		<>
			<dialog className={styles.dialog} id="settings" style={{paddingBottom: "24px !important"}}>
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
									<input
										style={{
											opacity: 0.9,
											color: "#b1b1b1",
											cursor: "not-allowed",
										}}
										disabled={true}
										className="col-12 p-2"
										pattern="[0-9]{12}"
										value={user}
										onChange={(e) => setUser(e.target?.value)}
									/>
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
									<select value={lang} onChange={(e) => setlang(e.target.value)}>
										{registered &&
											registered.courses.map(
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
			<dialog className={styles.dialog} id="wheel">
				<div id="wheel-div">
					{courseData && (
						<QuestionsProgress
							user={user}
							setData={setData}
							courseData={courseData}
						/>
					)}
				</div>
			</dialog>
			<div className={styles.qna}>
				{data && <h2>{String(data?.questionData?.SESSION_NAME)}</h2>}
				{data && (
					<div
						dangerouslySetInnerHTML={{
							__html: String(data.questionData.Q_DESC),
						}}
					/>
				)}
			</div>
			<div
				className="row d-flex justify-content-between mb-2 sticky-bottom"
				style={{ bottom: "10px !important", zIndex: 3 }}
			>
				<div
					className="d-flex g-6 justify-content-end"
					style={{ gap: 8, bottom: "10px !important" }}
				>
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
					<button
						className={styles.closebutton}
						style={{
							display: "flex",
							alignItems: "center",
							borderWidth: 1.8,
							padding: "6px 10px",
							fontSize: 22,
						}}
						onClick={handleNextQuestionOnClick}
						title="Progress (Select Question)"
					>
						<TbProgressBolt />
					</button>
				</div>
			</div>
			<div className={styles.grid}>
				<div className={styles.caseChild}>
					<div className={styles.sideContainer}>
						<div>
							<h3>Mandatory Case</h3>
							{data && (
								<>
									<div>
										<p>{data.questionData.MANDATORY[page]}</p>
									</div>
								</>
							)}
						</div>
						{data &&
							(data.questionData.MANDATORY.length > 1 ? (
								<div className={styles.moveButtons}>
									<button
										disabled={page <= 0}
										onClick={() => setPage((i) => i - 1)}
									>
										<FaAngleLeft />
									</button>
									<p>
										{page + 1}/{data.questionData.MANDATORY.length}
									</p>
									<button
										disabled={page >= data.questionData.MANDATORY.length - 1}
										onClick={() => setPage((i) => i + 1)}
									>
										<FaAngleRight />
									</button>
								</div>
							) : null)}
					</div>
					<div className={styles.sideContainer}>
						<div>
							<h3>Test Case</h3>
							{data && (
								<div className={styles.testCase}>
									<div>
										<p>Input</p>
										<code
											dangerouslySetInnerHTML={{
												__html: String(
													data.questionData.TESTCASES[testpage].INPUT,
												),
											}}
										></code>
									</div>
									<div>
										<p>Output</p>
										<code
											dangerouslySetInnerHTML={{
												__html: String(
													data.questionData.TESTCASES[testpage].OUTPUT,
												),
											}}
										></code>
									</div>
								</div>
							)}
						</div>
						{data &&
							(data.questionData.TESTCASES.length > 1 ? (
								<div className={styles.moveButtons}>
									<button
										disabled={testpage <= 0}
										onClick={() => setTest((i) => i - 1)}
									>
										<FaAngleLeft />
									</button>
									<p>
										{testpage + 1}/{data.questionData.TESTCASES.length}
									</p>
									<button
										disabled={
											testpage >= data.questionData.TESTCASES.length - 1
										}
										onClick={() => setTest((i) => i + 1)}
									>
										<FaAngleRight />
									</button>
								</div>
							) : null)}
					</div>
				</div>

				<div className={styles.codeWrapper}>
					<p>Code Editor</p>
					<button onClick={run} disabled={code == ""} className={styles.run}>
						<FaSquareCheck /> Submit
					</button>
					<CodeEditor code={code} language={language} onChange={onChange} />
					<p
						style={{
							textAlign: "right",
							marginRight: "12px",
							marginBottom: 0,
							opacity: 0.7,
							position: "relative",
							bottom: "-4px",
						}}
					>
						Powered by{" "}
						<a
							href="https://execoder.vercel.app"
							target="_blank"
							style={{ color: "#a8aceb" }}
						>
							Execoder
						</a>
					</p>
				</div>
			</div>
			<div id="result">
				{res && (
					<div className={styles.result}>
						<h2
							style={
								res.result.statusCode != "200"
									? { color: "var(--red)" }
									: { color: "var(--green)" }
							}
						>
							{res.result.evalPercentage}%
						</h2>
						{res.result.errorMsg ? (
							<pre className={styles.error}>{res.result.errorMsg}</pre>
						) : (
							<div className={styles.resVar}>
								{res.result.statusArray.map((el, ind) => {
									return (
										<div className={el.color} key={ind}>
											<p>{el.msg}</p>
										</div>
									);
								})}
							</div>
						)}
					</div>
				)}
			</div>
		</>
	);
};

export default Question;
