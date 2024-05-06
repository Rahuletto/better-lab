import styles from '@/styles/Question.module.css';
import { CompilerResponse, QuestionData } from '@/types';
import { convertLanguageCode } from '@/utils/Convert';
import { useRouter } from 'next/router';
import { MouseEventHandler, useEffect } from 'react';
import { FaPlay, FaSquareCheck } from 'react-icons/fa6';
import { fromString, getCompilers } from 'wandbox-api-updated/lib';
export default function CodeBlock({
  qData,
  compileData,
  run,
  courseId,
  code,
  children,
}: {
  qData: QuestionData | null;
  compileData: CompilerResponse | null;
  run: MouseEventHandler<HTMLButtonElement>;
  courseId: string;
  code: string;
  children: any;
}) {
  const router = useRouter();

  function compile() {}
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
      <a target="new" onClick={() => compile()} className={styles.run}>
        <FaPlay /> Run
      </a>
      <button
        onClick={run}
        disabled={code === '' || qData?.studentData.STATUS === 2}
        className={styles.submit}>
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
