import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import styles from '@/styles/Course.module.css';

import { Courses, RegisteredCourse } from '@/types';

import Loader from '@/components/PageComponents/Courses/Loader';

const SettingsButton = dynamic(
  () =>
    import('@/components/Elements/Buttons/SettingsButton').then(
      (mod) => mod.default,
    ),
  { ssr: false },
);

const CourseElement = dynamic(
  () =>
    import('@/components/PageComponents/Courses/CourseElement').then(
      (mod) => mod.default,
    ),
  { ssr: false },
);

const SettingsDialog = dynamic(
  () =>
    import('@/components/Elements/Dialog/SettingsDialog').then(
      (mod) => mod.default,
    ),
  { ssr: false },
);

export default function Course() {
  const router = useRouter();

  const [regData, setRegData] = useState<RegisteredCourse | null>(null); // Registered Course

  const [courseId, setCourseId] = useState('11|C'); // The course they currently working on
  const [user, setUser] = useState('');

  useEffect(() => {
    const us = localStorage.getItem('userid');

    const sr = localStorage.getItem('server');

    fetch('/api/status?server=' + sr)
      .then((d) => d.json())
      .then((a) => {
        if (a.Status != 1) router.push('/offline');
      });

    if (!us) router.push('/login');
    else {
      setUser(us);

      fetch('/api/getreg?user=' + us + '&server=' + sr, {
        headers: {
          Authorization: `Basic ${btoa(us)}`,
        },
      })
        .then((d) => d.json())
        .then((a) => {
          setRegData(a);
        });
    }
  }, []);

  return (
    <>
      <header>
        <h1>Better-Lab</h1>
      </header>
      {user ? (
        <main>
          <SettingsDialog
            user={user}
            logout={() => {
              localStorage.setItem('userid', '');
              router.push('/login');
            }}
          />

          <div className={styles.registered}>
            <h2>Registered Courses</h2>
            <SettingsButton
              style={{
                display: 'flex',
                alignItems: 'center',
                borderWidth: 1.8,
                padding: '8px 12px',
                fontSize: 18,
              }}
            />
          </div>
          <div className={styles.grid}>
            {regData ? (
              regData.courses.map((course: Courses, index: number) => {
                return (
                  <CourseElement
                    course={course}
                    index={index}
                    onClick={() => {
                      localStorage.setItem(
                        'course',
                        `${course.COURSE_ID}|${course.COURSE_NAME}`,
                      );
                      setCourseId(`${course.COURSE_ID}|${course.COURSE_NAME}`);
                      router.push('/question');
                    }}
                  />
                );
              })
            ) : (
              <Loader />
            )}
          </div>
        </main>
      ) : (
        <div className="loader-div">
          <h1 className="loader-text">Loading...</h1>
        </div>
      )}
    </>
  );
}
