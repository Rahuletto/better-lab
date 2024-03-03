import { useEffect, useState } from 'react';
import dialogStyles from './Dialog.module.css';
import styles from './QuestionProgress.module.css';

import { CourseInfo } from '@/types';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

import dialogHandler from '@/utils/DialogHandler';
import Skeleton from 'react-loading-skeleton';

const QuestionsProgress = ({
  courseData,
  setNum,
  num,
  user,
}: {
  courseData: CourseInfo | null;
  setNum: (n: number) => void;
  num: number | undefined;
  user: string;
}) => {
  useEffect(() => {
    const wheel = document.getElementById('wheel') as HTMLDialogElement;

    wheel?.addEventListener('click', (e: MouseEvent) => {
      dialogHandler(e);
    });

    wheel?.addEventListener('touchend', (e: TouchEvent) => {
      dialogHandler(e);
    });

    return () => {
      wheel.removeEventListener('click', dialogHandler);
      wheel.removeEventListener('touchend', dialogHandler);
    };
  }, [user]);

  const [index, setIndex] = useState(0);

  function handleOnClick(e: string) {
    if (!courseData) return;

    if (e === 'next' && index < courseData.flare.children.length - 1) {
      setIndex(index + 1);
    } else if (index > 0) {
      setIndex(index - 1);
    }
  }

  return (
    <dialog className={dialogStyles.dialog} id="wheel">
      <div id="wheel-div">
        {courseData ? (
          <>
            <h1
              style={{
                fontSize: 24,
                textTransform: 'capitalize',
                marginBottom: 18,
              }}>
              {' '}
              {courseData &&
                courseData.flare.children[index].name.toLowerCase()}
            </h1>
            <div className={styles.grid}>
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-3" style={{ width: 64 }}>
                  <p className={styles.levelTitle}> L1</p>
                </div>
                <div className="col-9 d-flex" style={{ gap: 4 }}>
                  {courseData &&
                    courseData?.flare.children[index].children.map((el, i) => {
                      return (
                        <div
                          title={'Question ' + el.name}
                          key={i}
                          role="button"
                          onClick={() => {
                            setNum(Number(el.name));
                          }}
                          className={[
                            el.status === 2
                              ? styles.greenSquare
                              : el.status === 1
                              ? styles.yellowSquare
                              : styles.redSquare,
                            num === Number(el.name) ? styles.active : '',
                          ].join(' ')}
                        />
                      );
                    })}
                </div>
              </div>
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-3" style={{ width: 64 }}>
                  <p className={styles.levelTitle}> L2</p>
                </div>
                <div className="col-9 d-flex" style={{ gap: 4 }}>
                  {courseData &&
                    courseData?.flare.children[index].children.map((el, i) => {
                      return (
                        <div
                          title={'Question ' + el.children[0].name}
                          key={i}
                          role="button"
                          onClick={() => {
                            setNum(Number(el.children[0].name));
                          }}
                          className={[
                            el.children[0].status === 2
                              ? styles.greenSquare
                              : el.children[0].status === 1
                              ? styles.yellowSquare
                              : styles.redSquare,
                            num === Number(el.children[0].name)
                              ? styles.active
                              : '',
                          ].join(' ')}
                        />
                      );
                    })}
                </div>
              </div>
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-3" style={{ width: 64 }}>
                  <p className={styles.levelTitle}> L3</p>
                </div>
                <div className="col-9 d-flex" style={{ gap: 4 }}>
                  {courseData &&
                    courseData?.flare.children[index].children.map((el, i) => {
                      return (
                        <div
                          title={'Question ' + el.children[0].children[0].name}
                          key={i}
                          role="button"
                          onClick={() => {
                            setNum(Number(el.children[0].children[0].name));
                          }}
                          className={[
                            el.children[0].children[0].status === 2
                              ? styles.greenSquare
                              : el.children[0].children[0].status === 1
                              ? styles.yellowSquare
                              : styles.redSquare,
                            num === Number(el.children[0].children[0].name)
                              ? styles.active
                              : '',
                          ].join(' ')}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <button
                type="button"
                onClick={() => handleOnClick('previous')}
                className={styles.pagination}
                disabled={index <= 0}>
                <FaAngleLeft />
              </button>
              <p style={{ margin: 0, color: 'var(--color)' }}>
                {index + 1}/{courseData.flare.children.length}
              </p>
              <button
                type="button"
                onClick={() => handleOnClick('next')}
                className={styles.pagination}
                disabled={index >= courseData.flare.children.length - 1}>
                <FaAngleRight />
              </button>
            </div>
          </>
        ) : (
          <>
            <Skeleton width={100} />
            <Skeleton
              height={115}
              style={{ borderRadius: 10, width: '100%' }}
            />
          </>
        )}
      </div>
    </dialog>
  );
};

export default QuestionsProgress;
