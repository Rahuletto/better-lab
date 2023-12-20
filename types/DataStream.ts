export type DataStream = {
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