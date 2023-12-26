import styles from '@/styles/Question.module.css';
import { CompilerResponse, QuestionData } from '@/types';
import { MouseEventHandler } from 'react';
import { FaSquareCheck } from 'react-icons/fa6';

export default function CodeBlock({
  qData,
  compileData,
  run,
  code,
  children,
}: {
  qData: QuestionData | null;
  compileData: CompilerResponse | null;
  run: MouseEventHandler<HTMLButtonElement>;
  code: string;
  children: any;
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
      <button
        onClick={run}
        disabled={code === '' || qData?.studentData.STATUS === 2}
        className={styles.run}>
        <FaSquareCheck /> Submit
      </button>
      {children}
      <p
        style={{
          textAlign: 'right',
          marginRight: '12px',
          marginBottom: 0,
          opacity: 0.7,
          position: 'relative',
          bottom: '-4px',
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
