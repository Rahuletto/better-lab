import styles from '@/styles/Question.module.css';
import { CompilerResponse, QuestionData } from '@/types';
import { useEffect, useState } from 'react';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

// Sanitize
import { sanitize } from 'dompurify';

export default function TestCase({
  qData,
  compileData,
}: {
  qData: QuestionData | null;
  compileData: CompilerResponse | null;
}) {
  const [testPage, setTestPage] = useState(0); // Test case pagination

  useEffect(() => {
    setTestPage(0);
  }, [qData]);

  return (
    <div
      className={styles.sideContainer}
      style={
        qData?.studentData.STATUS === 2 ||
        compileData?.result.evalPercentage === '100.0'
          ? { borderColor: 'var(--green)' }
          : {}
      }>
      <div>
        <h3>Test Case</h3>
        {qData && (
          <div className={styles.testCase}>
            <div>
              <p>Input</p>
              <code
                dangerouslySetInnerHTML={{
                  __html: sanitize(
                    qData.questionData.TESTCASES[testPage].INPUT,
                  ),
                }}></code>
            </div>
            <div>
              <p>Output</p>
              <code
                dangerouslySetInnerHTML={{
                  __html: sanitize(
                    qData.questionData.TESTCASES[testPage].OUTPUT,
                  ),
                }}></code>
            </div>
          </div>
        )}
      </div>
      {qData &&
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
        ) : null)}
    </div>
  );
}
