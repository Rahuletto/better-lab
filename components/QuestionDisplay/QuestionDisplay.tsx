import { useCallback, useState } from "react";
import styles from "./QuestionDisplay.module.css";

import { DataStream } from "@/pages";

import dynamic from "next/dynamic";
const CodeEditor = dynamic(
	() => import("../CodeEditor/Editor").then((mod) => mod.default),
	{ ssr: false },
);

import { FaAngleLeft, FaSquareCheck, FaAngleRight } from "react-icons/fa6";

import { loadLanguage } from "@uiw/codemirror-extensions-langs";

export type Languages =
	| "shell"
	| "c"
	| "objectiveCpp"
	| "csharp"
	| "crystal"
	| "d"
	| "erlang"
	| "go"
	| "groovy"
	| "haskell"
	| "java"
	| "javascript"
	| "julia"
	| "commonLisp"
	| "lua"
	| "php"
	| "pascal"
	| "perl"
	| "python"
	| "r"
	| "ruby"
	| "rust"
	| "sql"
	| "scala"
	| "swift"
	| "typescript";

const Question = () => {
	const [num, setNum] = useState<number>(75);
	const [user, setUser] = useState<string>("401123438381");
	const [data, setData] = useState<DataStream | null>(null);
	const [qid, setQid] = useState(null);
	const [opn, setOpn] = useState(false);

	const [code, setCode] = useState("");
	const [language, setLanguage] = useState(loadLanguage("c" as Languages));

	const [page, setPage] = useState(0);
	const [testpage, setTest] = useState(0);

	const onChange = useCallback((value: string) => {
		if (num) localStorage.setItem("code-" + num, String(value));
		setCode(value);
		return;
	}, []);

	async function getQuestion() {
		fetch("/api/question?id=" + num + "&user=" + user)
			.then((d) => d.json())
			.then((a) => {
				setData(a);
				setQid(a.studentData.Q_ID);
				setOpn(false);
			});
		return true;
	}

	return (
		<>
			<dialog open={opn}>
				<div>
					<form method="dialog">
						<input
							pattern="[0-9]{12}"
							value={user}
							onChange={(e) => setUser(e.target?.value)}
						/>
						<input
							value={num}
							type="number"
							onChange={(e) => setNum(Number(e.target?.value))}
						/>
						<button type="button" onClick={() => getQuestion()}>
							Submit
						</button>
					</form>
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

				<button type="button" onClick={() => setOpn(true)}>
					Edit
				</button>
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
          <button className={styles.run}><FaSquareCheck /> Submit</button>
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
		</>
	);
};

export default Question;
