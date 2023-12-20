import dynamic from "next/dynamic";
import React, { Suspense, memo } from "react";
import Loader from "./Loader";

const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), {
	loading: () => <Loader />,
	ssr: false,
});

const CodeMenu = dynamic(() => import("./menus/CodeMenu"), {
	ssr: false,
});

import { githubDarkInit } from "@uiw/codemirror-theme-github";

const vscodeKeymap = await (await import("@replit/codemirror-vscode-keymap"))
	.vscodeKeymap;
const indentationMarkers = await (
	await import("@replit/codemirror-indentation-markers")
).indentationMarkers;
const keymap = await (await import("@codemirror/view")).keymap;
const openSearchPanel = await (await import("@codemirror/search"))
	.openSearchPanel;
const colorPicker = await (await import("@replit/codemirror-css-color-picker"))
	.colorPicker;

import { TriggerEvent, useContextMenu } from "react-contexify";
import { Extension } from "@uiw/react-codemirror";

const ext = [
	keymap.of([{ key: "Ctrl-Shift-f", run: openSearchPanel }, ...vscodeKeymap]),
	indentationMarkers(),
	colorPicker,
];

type EditorProps = {
	language?: any;
	code?: string;
	theme?: "light" | "dark" | string;
	onChange?: Function | any;
};

const UnmemoEditor: React.FC<EditorProps> = ({ language, code, onChange }) => {
	const setup = {
		defaultKeymap: false,
		foldGutter: true,
		closeBrackets: true,
		bracketMatching: true,
		autocompletion: true,
		highlightActiveLine: true,
		highlightSpecialChars: true,
		syntaxHighlighting: true,
		searchKeymap: false,
		dropCursor: false,
		allowMultipleSelections: false,
		indentOnInput: true,
		lintKeymap: false,
		drawSelection: true,
		completionKeymap: false,
		history: true,
		historyKeymap: false,
		lineNumbers: true,
	};

	const { show } = useContextMenu({
		id: "elab",
	});

	function displayMenu(e: TriggerEvent) {
		show({
			event: e,
		});
	}

	return (
		<Suspense fallback={<Loader />}>
			<CodeMirror
				id="code-board"
				onContextMenu={displayMenu}
				placeholder={"Let's test your problem-solving skills"}
				theme={githubDarkInit({
					settings: {
						fontFamily: "var(--jb-font)",
						gutterForeground: "#4C4F73",
					},
				})}
				style={{
					pointerEvents: "auto",
					fontFamily: "var(--jb-font)",
					fontSize: "14px",
				}}
				value={code}
				extensions={language ? [...ext, language] : ext}
				draggable={false}
				aria-label="codeboard"
				basicSetup={setup}
				onChange={onChange}
			/>
			<CodeMenu />
		</Suspense>
	);
};

export default memo(function Editor(props: EditorProps) {
	return <UnmemoEditor {...props} />;
});
