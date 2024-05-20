import styles from '@/styles/Question.module.css';

import { CompilerResponse, Languages, QuestionData } from '@/types';
import { MouseEventHandler, ReactNode, useEffect } from 'react';
import { FaPlay, FaSquareCheck } from 'react-icons/fa6';
export default function CodeBlock({
  qData,
  compileData,
  run,
  code,
  children,
  runner,
  running
}: {
  qData: QuestionData | null;
  compileData: CompilerResponse | null;
  run?: MouseEventHandler<HTMLButtonElement>;
  runner?: MouseEventHandler<HTMLButtonElement>;
  running?: any;
  code: string;
  children: ReactNode;
}) {
  return (
    <div
      className={styles.codeWrapper}
      style={
        qData?.studentData.STATUS === 2 ||
        compileData?.result.evalPercentage === '100.0'
          ? { borderColor: 'var(--green)' }
          : {}
      }>
      <p>Code Editor</p>
      <div className={styles.buttonHolders}>
        <button onClick={runner} disabled={!qData || running} className={styles.run}>
          <FaPlay /> {running ? "Compiling" : "Run"}
        </button>
        {run ? (
          <button
            onClick={run}
            disabled={code === '' || qData?.studentData.STATUS === 2}
            className={styles.submit}>
            <FaSquareCheck /> Submit
          </button>
        ) : (
          <button
            onClick={() =>
              (document.getElementById('runner') as HTMLDialogElement).close()
            }
            className={styles.closeRunner}>
            Close
          </button>
        )}
      </div>

      {children}
      <p
        style={{
          textAlign: 'right',
          marginRight: '12px',
          marginBottom: 0,
          opacity: 0.7,
          position: 'absolute',
          bottom: '4px',
          right: '4px',
        }}>
        Powered by{' '}
        <a
          href="https://execoder.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#a8aceb' }}>
          Execoder
        </a>
      </p>
    </div>
  );
}
