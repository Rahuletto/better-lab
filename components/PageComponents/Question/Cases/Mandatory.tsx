import styles from '@/styles/Question.module.css';
import { CompilerResponse, QuestionData } from '@/types';
import { useEffect, useState } from 'react';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

export default function MandatoryCase({
  qData,
  compileData,
}: {
  qData: QuestionData | null;
  compileData: CompilerResponse | null;
}) {
  const [mandatoryPage, setMandatoryPage] = useState(0); // Mandatory case pagination

  useEffect(() => {
    setMandatoryPage(0);
  }, [qData]);

  return (
    <div
      className={styles.sideContainer}
      style={
        qData?.studentData.STATUS == 2 ||
        compileData?.result.evalPercentage == '100.0'
          ? { borderColor: 'var(--green)' }
          : {}
      }>
      <div>
        <h3>Mandatory Case</h3>
        {qData && (
          <>
            <div>
              <p>{qData.questionData.MANDATORY[mandatoryPage]}</p>
            </div>
          </>
        )}
      </div>
      {qData &&
        (qData.questionData.MANDATORY.length > 1 ? (
          <div className={styles.moveButtons}>
            <button
              disabled={mandatoryPage <= 0}
              onClick={() => setMandatoryPage((i) => i - 1)}>
              <FaAngleLeft />
            </button>
            <p>
              {mandatoryPage + 1}/{qData.questionData.MANDATORY.length}
            </p>
            <button
              disabled={
                mandatoryPage >= qData.questionData.MANDATORY.length - 1
              }
              onClick={() => setMandatoryPage((i) => i + 1)}>
              <FaAngleRight />
            </button>
          </div>
        ) : null)}
    </div>
  );
}
