import styles from '@/styles/Question.module.css';
import { QuestionData } from '@/types';

export default function InputCase({
  input,
  setInput,
  qData,
}: {
  input: string;
  setInput: any;
  qData: QuestionData | null;
}) {
  return (
    <div className={styles.sideContainer} style={{gap: 4, justifyContent: 'flex-start', paddingBottom: 14}}>

        <h3>Input</h3>
        {qData && (
          <textarea value={input} onChange={(e) => setInput(e.target.value)} />
        )}

      {/* {qData &&
        (qData.questionData.TESTCASES.length > 1 ? (
          <div className={styles.moveButtons}>
            <button
              disabled={testPage <= 0}
              onClick={() => setTestPage((i) => i - 1)}>
              <FaAngleLeft />
            </button>
            <p>
              {testPage + 1}/{qData.questionData.TESTCASES.length}
            </p>
            <button
              disabled={testPage >= qData.questionData.TESTCASES.length - 1}
              onClick={() => setTestPage((i) => i + 1)}>
              <FaAngleRight />
            </button>
          </div>
        ) : null)} */}
    </div>
  );
}
