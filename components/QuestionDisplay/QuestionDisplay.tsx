import { useCallback, useState } from 'react';
import styles from './QuestionDisplay.module.css';

import { DataStream } from '@/pages';

import dynamic from 'next/dynamic';
const CodeEditor = dynamic(
  () => import('../CodeEditor/Editor').then((mod) => mod.default),
  { ssr: false }
);

import { loadLanguage } from '@uiw/codemirror-extensions-langs';

export type Languages =
  | 'shell'
  | 'c'
  | 'objectiveCpp'
  | 'csharp'
  | 'crystal'
  | 'd'
  | 'erlang'
  | 'go'
  | 'groovy'
  | 'haskell'
  | 'java'
  | 'javascript'
  | 'julia'
  | 'commonLisp'
  | 'lua'
  | 'php'
  | 'pascal'
  | 'perl'
  | 'python'
  | 'r'
  | 'ruby'
  | 'rust'
  | 'sql'
  | 'scala'
  | 'swift'
  | 'typescript';

const Question = () => {
  const [num, setNum] = useState<number>(75);
  const [user, setUser] = useState<string>('401123438381');
  const [data, setData] = useState<DataStream | null>(null);
  const [qid, setQid] = useState(null);
  const [opn, setOpn] = useState(false);

  const [code, setCode] = useState('');
  const [language, setLanguage] = useState(loadLanguage('c' as Languages));

  const [page, setPage] = useState(0);

  const onChange = useCallback((value: string) => {
    if (num) localStorage.setItem('code-' + num, String(value));
    setCode(value);
    return;
  }, []);

  async function run() {
    fetch('/api/question?id=' + num + '&user=' + user)
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
      <dialog className={styles.dialog} open={opn}>
        <div className="container d-flex flex-column justify-content-around">
          <div className="row">
            <h1>Settings</h1>
          </div>
          <div className="row">
            <form method="dialog" className="container d-flex  flex-column">
              <input
                className="col-12 m-2 p-2"
                pattern="[0-9]{12}"
                value={user}
                onChange={(e) => setUser(e.target?.value)}
              />
              <input
                value={num}
                className="col-12 m-2 p-2"
                type="number"
                onChange={(e) => setNum(Number(e.target?.value))}
              />
            </form>
          </div>
          <div className="row d-flex justify-content-end mt-5">
            <div className="col-3">
              <button
                className="m-2 btn btn-secondary"
                type="button"
                onClick={() => run()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </dialog>
      <button type="button" onClick={() => setOpn(true)}>
        Edit
      </button>

      {data && <h2>{String(data?.questionData?.SESSION_NAME)}</h2>}
      {data && (
        <div
          dangerouslySetInnerHTML={{
            __html: String(data.questionData.Q_DESC),
          }}
        />
      )}
      <div className={styles.grid}>
        <div className={styles.caseChild}>
          <div
            className={styles.sideContainer}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h3>Mandatory Case</h3>
              {data && (
                <>
                  <div>
                    <p>{data.questionData.MANDATORY[page]}</p>
                  </div>
                </>
              )}
            </div>
            {data &&
              (data.questionData.MANDATORY.length > 1 ? (
                <div className={styles.moveButtons}>
                  <button
                    disabled={page <= 0}
                    onClick={() => setPage((i) => i - 1)}
                  >
                    {'<'}
                  </button>
                  <button
                    disabled={page >= data.questionData.MANDATORY.length - 1}
                    onClick={() => setPage((i) => i + 1)}
                  >
                    {'>'}
                  </button>
                </div>
              ) : null)}
          </div>
          <div className={styles.sideContainer}>
            <h3>Test Case</h3>
            {data &&
              data.questionData.TESTCASES.map(
                (e: { _id: number; INPUT: string; OUTPUT: string }) => {
                  return (
                    <div key={e._id}>
                      <p
                        style={{
                          color: 'var(--accent)',
                          fontFamily: 'var(--space)',
                          fontSize: 16,
                        }}
                      >
                        Input
                      </p>
                      <code
                        dangerouslySetInnerHTML={{ __html: String(e.INPUT) }}
                      ></code>
                      <p
                        style={{
                          color: 'var(--accent)',
                          fontFamily: 'var(--space)',
                          fontSize: 16,
                        }}
                      >
                        Output
                      </p>
                      <code
                        dangerouslySetInnerHTML={{ __html: String(e.OUTPUT) }}
                      ></code>
                    </div>
                  );
                }
              )}
          </div>
        </div>

        <div className={styles.codeWrapper}>
          <p>Code Editor</p>
          <CodeEditor code={code} language={language} onChange={onChange} />
          <p
            style={{
              textAlign: 'right',
              marginRight: '12px',
              marginBottom: 0,
              opacity: 0.7,
            }}
          >
            Powered by{' '}
            <a
              href="https://execoder.vercel.app"
              target="_blank"
              style={{ color: '#a8aceb' }}
            >
              Execoder
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Question;
