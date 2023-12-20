import { useCallback, useState } from "react";
import styles from "../../styles/Home.module.css";

import dynamic from "next/dynamic";
const CodeEditor = dynamic(
	() => import("../CodeEditor/Editor").then((mod) => mod.default),
	{ ssr: false },
);

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

type DataStream = {
	Status: number;
	studentData: {
		_id: number;
		COURSE_ID: number;
		Q_ID: string;
		SEQUENCE_ID: number;
		COURSE_NAME: string;
		LEVEL: number;
		SESSION: number;
		SESSION_NAME: string;
		STATUS: number;
		CODE: {
			value: string;
			mode: number;
		}[];
		EVALUATION: number;
	};
	questionData: {
		COMPLEXITY: number[];
		COURSE_NAME: string;
		DEFAULT_CODE: number;
		LEVEL: number;
		MANDATORY: string[];
		MODE: string;
		Q_DESC: string;
		SEQ_ID: number;
		SESSION_ID: number;
		SESSION_NAME: string;
		TAGS: string[];
		TESTCASES: {
			_id: number;
			INPUT: string;
			OUTPUT: string;
		}[];
		key: number;
	};
	queryData: {};
	status: [];
};

const Question = () => {
	const [num, setNum] = useState<number>(75);
	const [user, setUser] = useState<string>("401123438381");
	const [data, setData] = useState<DataStream | null>(null);
	const [qid, setQid] = useState(null);
	const [opn, setOpn] = useState(false);

	const [code, setCode] = useState("");
	const [language, setLanguage] = useState(loadLanguage("c" as Languages));

	const onChange = useCallback((value: string) => {
		if (num) localStorage.setItem("code-" + num, String(value));
		setCode(value);
		return;
	}, []);

	async function run() {
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
						<button type="button" onClick={() => run()}>
							Submit
						</button>
					</form>
				</div>
			</dialog>
			<button type="button" onClick={() => setOpn(true)}>
				Edit
			</button>
			{data && <h2>{String(data?.questionData?.SESSION_NAME)}</h2>}
			{data && (
				<div
					dangerouslySetInnerHTML={{ __html: String(data.questionData.Q_DESC) }}
				/>
			)}
			<h2>Mandatory Case</h2>
			{data &&
				data.questionData.MANDATORY.map((e: any) => {
					return (
						<div key={e.id}>
							<h3>Mandatory Case</h3>
							<p>{e}</p>
						</div>
					);
				})}
			<h2>Test Case</h2>
			{data &&
				data.questionData.TESTCASES.map(
					(e: { _id: number; INPUT: string; OUTPUT: string }) => {
						return (
							<div key={e._id}>
								<h3>TEST CASE {e._id}</h3>
								<div
									dangerouslySetInnerHTML={{ __html: String(e.INPUT) }}
								></div>
								<div
									dangerouslySetInnerHTML={{ __html: String(e.OUTPUT) }}
								></div>
							</div>
						);
					},
				)}

			<h2>Output</h2>
			<div className={styles.codeWrapper}>
				<p>Code Editor</p>
				<CodeEditor code={code} language={language} onChange={onChange} />
				<p
					style={{
						textAlign: "right",
						marginRight: "12px",
						marginBottom: 0,
						opacity: 0.7,
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
		</>
	);
};

export default Question;
