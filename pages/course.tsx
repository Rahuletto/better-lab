import Loader from '@/components/PageComponents/Courses/Loader';
import Profile from '@/components/PageComponents/Courses/Profile';
import styles from '@/styles/Course.module.css';
import { Courses, RegisteredCourse } from '@/types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SettingsButton = dynamic(
  () =>
    import('@/components/Elements/Buttons/SettingsButton').then(
      (mod) => mod.default
    ),
  { ssr: false }
);

const CourseElement = dynamic(
  () =>
    import('@/components/PageComponents/Courses/CourseElement').then(
      (mod) => mod.default
    ),
  { ssr: false }
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
        if (a.Status !== 1) router.push('/offline');
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
      <header style={{border: '0px none', marginBottom: 4}}>
        <h1>Better-Lab</h1>
        <Profile name={user} />
      </header>
      {user ? (
        <main>
          <div className={styles.grid}>
            {regData ? (
              regData.courses.map((course: Courses, index: number) => {
                return (
                  <CourseElement
                    course={course}
                    index={index}
                    key={index}
                    onClick={() => {
                      localStorage.setItem(
                        'course',
                        `${course.COURSE_ID}|${course.COURSE_NAME}`
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
          <style>
        {
          `html {
            padding: 12px !important;
          }`
        }
        </style>
        </main>
      ) : (
        <div className="loader-div">
          <style>
        {
          `html {
            padding: 12px !important;
          }`
        }
        </style>
          <h1 className="loader-text">Loading...</h1>
        </div>
      )}
    </>
  );
}
