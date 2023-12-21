export type RegisteredCourse = {
	total: number;
	max: number;
	courses: {
		_id: string;
		USER_ID: string;
		USER_NAME: string;
		COURSE_ID: number;
		COURSE_NAME: string;
		TITLE: string;
		DEPARTMENT: string;
		STATUS: number;
		LEVEL1: number;
		LEVEL2: number;
		LEVEL3: number;
		CERTIFIED_L1: number;
		CERTIFIED_L2: number;
		CERTIFIED_L3: number;
		BATCH_ID: string;
		BATCH_NAME: string;
		batchid: number;
		createdBy: string;
		key: string;
		FACULTY_ID: string;
		FACULTY_NAME: string;
	}[];
};
