import { Suspense, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import styles from '@/styles/Question.module.css';

import {
  Languages,
  QuestionData,
  CompilerResponse,
  RegisteredCourse,
  CourseInfo,
} from '@/types';

import { loadLanguage } from '@uiw/codemirror-extensions-langs';

// Sanitize
import { sanitize } from 'dompurify';

const CodeEditor = dynamic(
  () => import('../../Elements/CodeEditor/Editor').then((mod) => mod.default),
  { ssr: false }
);

const SettingsDialog = dynamic(
  () =>
    import('@/components/Elements/Dialog/SettingsDialog').then(
      (mod) => mod.default
    ),
  { ssr: false }
);

const MandatoryCase = dynamic(
  () => import('./Cases/Mandatory').then((mod) => mod.default),
  { ssr: false, loading: () => <Loader /> }
);

const TestCase = dynamic(
  () => import('./Cases/Test').then((mod) => mod.default),
  { ssr: false, loading: () => <Loader /> }
);

const Toolbar = dynamic(() => import('./Toolbar').then((mod) => mod.default), {
  ssr: false,
  loading: () => <ToolbarLoader />,
});

const CodeBlock = dynamic(
  () => import('./CodeBlock').then((mod) => mod.default),
  { ssr: false, loading: () => <Loader /> }
);

const Output = dynamic(() => import('./Output').then((mod) => mod.default), {
  ssr: false,
});

const QuestionsProgress = dynamic(
  () =>
    import('../../Elements/Dialog/QuestionsProgress').then(
      (mod) => mod.default
    ),
  { ssr: true }
);

import Loader from './Cases/Loader';

import { RiEmotionHappyFill } from 'react-icons/ri';

import Skeleton from 'react-loading-skeleton';

export default function Question() {
  const router = useRouter();

  const [num, setNum] = useState<number>(); // Question number
  const [user, setUser] = useState<string>(); // UserID

  const [qData, setQData] = useState<QuestionData | null>(null); // Question Data
  const [regData, setRegData] = useState<RegisteredCourse | null>(null); // Registered Course
  const [compileData, setCompileData] = useState<CompilerResponse | null>(null); // Compiler Response

  const [courseId, setCourseId] = useState('11|C'); // The course they currently working on

  const [code, setCode] = useState(''); // The code
  const [language, setLanguage] = useState(
    loadLanguage(('c' as Languages) || 'shell')
  ); // Language of such course in codeblock

  const [courseData, setCourseData] = useState<CourseInfo | null>(null); // All course data (the wheel)

  const [tcasePage, setTCasePage] = useState(0); // Test case pagination

  // Changes happen in Codeblock happens here
  const onChange = useCallback((value: string) => {
    setCode(value);
    return;
  }, []);

  // Initial Render
  useEffect(() => {
    const us = localStorage.getItem('userid');
    if (!us) router.push('/login');
    else setUser(us);

    const lan = localStorage.getItem('course');
    if (lan) setCourseId(lan);

    fetch('/api/status')
      .then((d) => d.json())
      .then((a) => {
        if (a.Status != 1) router.push('/offline');
      });

    handleProgress();
  }, []);

  useEffect(() => {
    setTCasePage(0);

    if (user && num) {
      getQuestion(num);
      (document.getElementById('wheel') as HTMLDialogElement).close();
    }
    setCode('');
    setCompileData(null);
  }, [num, courseId]);

  useEffect(() => {
    const l = courseId.split('|')[1];
    setLanguage(loadLanguage((l.toLowerCase() as Languages) || 'shell'));
  }, [courseId]);

  useEffect(() => {
    if (user) {
      const sr = localStorage.getItem('server');

      fetch('/api/getreg?user=' + user + '&server=' + sr, {
        headers: {
          Authorization: `Basic ${btoa(user)}`,
        },
      })
        .then((d) => d.json())
        .then((a) => {
          setRegData(a);
        });

      handleProgress();
    }
  }, [user]);

  function changeQuestion(n: number) {
    saveCode();
    setNum(n);
  }

  function saveCode() {
    const sr = localStorage.getItem('server');

    if (!code || !user) return;
    else {
      fetch(
        '/api/save?id=' +
          num +
          '&user=' +
          user +
          '&server=' +
          sr +
          '&cid=' +
          qData?.studentData.COURSE_ID,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${btoa(user)}`,
          },
          body: JSON.stringify({
            code: code,
          }),
        }
      );
      return true;
    }
  }

  async function getQuestion(n: number) {
    const cid = courseId.split('|')[0];
    const reg = regData?.courses.find((a: any) => a.COURSE_ID == cid);
    const sr = localStorage.getItem('server');
    if (!user) return;

    fetch('/api/question?id=' + n + '&user=' + user + '&server=' + sr, {
      cache: 'force-cache',
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(user)}`,
      },
      body: JSON.stringify({
        course: {
          id: reg?.COURSE_ID,
          name: reg?.COURSE_NAME,
        },
      }),
    })
      .then((d) => d.json())
      .then((a: QuestionData) => {
        setQData(a);
        if (a.studentData.CODE[0]?.value) {
          setCode(a.studentData.CODE[0].value);
        }
      });
    return true;
  }

  function handleProgress() {
    getCourseInfo().then((_a) => {
      (document.getElementById('wheel') as HTMLDialogElement).showModal();
    });
  }

  function getCourseInfo() {
    return new Promise((resolve) => {
      const [id, l] = courseId.split('|');
      const sr = localStorage.getItem('server');
      if (user) {
        fetch('/api/circle?user=' + user + '&server=' + sr, {
          method: 'POST',
          headers: {
            Authorization: `Basic ${btoa(user)}`,
          },
          body: JSON.stringify({
            course: {
              name: l,
              id: Number(id),
            },
          }),
        })
          .then((d) => d.json())
          .then((a) => {
            resolve(a);
            setCourseData(a);
          });
      }
    });
  }

  async function run() {
    if (!qData) return;
    if (!user) return;
    const box = document.getElementById('result');
    const sr = localStorage.getItem('server');
    saveCode();
    fetch('/api/run?user=' + user + '&id=' + num + '&server=' + sr, {
      cache: 'force-cache',
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(user)}`,
      },
      body: JSON.stringify({
        qid: qData?.studentData.Q_ID,
        code: code,
        language: courseId.split('|')[1].toLowerCase(),
        course: {
          name: qData?.questionData.COURSE_NAME,
          id: qData?.studentData.COURSE_ID,
        },
      }),
    })
      .then((d) => d.json())
      .then((a) => {
        setCompileData(a);
        setTimeout(() => {
          box?.scrollIntoView({ behavior: 'smooth' });
        }, 1200);
      });
    return true;
  }

  return (
    <>
      <header>
        <h1>Better-Lab</h1>
      </header>
      {user ? (
        <main>
          <SettingsDialog
            logout={() => {
              localStorage.setItem('userid', '');
              router.push('/login');
            }}
            user={user}
            regData={regData}
            courseId={courseId}
            changeCourses={(e) => {
              localStorage.setItem('course', e.target.value);
              setCourseId(e.target.value);
            }}
          />

          <QuestionsProgress
            user={user}
            setNum={changeQuestion}
            num={num}
            courseData={courseData}
          />

          <div className={styles.qna}>
            {qData && <h2>{String(qData?.questionData?.SESSION_NAME)}</h2>}
            {qData && (
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitize(qData.questionData.Q_DESC),
                }}
              />
            )}
          </div>

          <Suspense fallback={<ToolbarLoader />}>
            <Toolbar
              handleProgress={handleProgress}
              onHome={() => router.push('/course')}
            />
          </Suspense>

          {(qData?.studentData.STATUS == 2 ||
            compileData?.result.evalPercentage == '100.0') && (
            <div className={styles.completed}>
              <RiEmotionHappyFill style={{ fontSize: 18 }} />
              <p> You have completed this exercise! YAY</p>
            </div>
          )}

          <div className={styles.grid}>
            <div className={styles.caseChild}>
              <Suspense fallback={<Loader />}>
                <MandatoryCase compileData={compileData} qData={qData} />
              </Suspense>

              <Suspense fallback={<Loader />}>
                <TestCase compileData={compileData} qData={qData} />
              </Suspense>
            </div>

            <Suspense fallback={<Loader />}>
              <CodeBlock
                compileData={compileData}
                qData={qData}
                code={code}
                run={run}>
                <CodeEditor
                  code={code}
                  language={language}
                  onChange={onChange}
                />
              </CodeBlock>
            </Suspense>
          </div>

          <Output compileData={compileData} />
        </main>
      ) : (
        <main>
          <div className={styles.qna}>
            <Skeleton style={{ width: '200px' }} />
            <Skeleton style={{ width: '320px' }} />
            <Skeleton style={{ width: '400px' }} />
            <Skeleton style={{ width: '250px' }} />
            <br />
            <Skeleton style={{ width: '400px' }} />
            <Skeleton style={{ width: '120px' }} />
          </div>

          <div
            className="row d-flex justify-content-between mb-2"
            style={{ position: 'sticky', bottom: '14px', zIndex: 3 }}>
            <div className="d-flex g-6 justify-content-end" style={{ gap: 8 }}>
              <Skeleton width={46} height={36} style={{ borderRadius: 10 }} />
              <Skeleton width={46} height={36} style={{ borderRadius: 10 }} />
              <Skeleton width={46} height={36} style={{ borderRadius: 10 }} />
            </div>
          </div>
          <div className={styles.grid} style={{ height: '96vh' }}>
            <div className={styles.caseChild}>
              <Loader />
              <Loader />
            </div>

            <Loader />
          </div>
        </main>
      )}
    </>
  );
}

function ToolbarLoader() {
  return (
    <div
      className="row d-flex justify-content-between mb-2"
      style={{ position: 'sticky', bottom: '14px', zIndex: 3 }}>
      <div className="d-flex g-6 justify-content-end" style={{ gap: 8 }}>
        <Skeleton width={46} height={36} style={{ borderRadius: 10 }} />
        <Skeleton width={46} height={36} style={{ borderRadius: 10 }} />
        <Skeleton width={46} height={36} style={{ borderRadius: 10 }} />
      </div>
    </div>
  );
}
