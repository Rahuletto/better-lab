import styles from '@/styles/Course.module.css';
import { Courses } from '@/types/RegisteredCourse';
import { MouseEventHandler } from 'react';

import dynamic from 'next/dynamic';

const IconMaker = dynamic(() => import('./Icons').then((mod) => mod.default), {
  ssr: true,
});

export default function CourseElement({
  course,
  index,
  onClick,
}: {
  course: Courses;
  index: number;
  onClick: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      style={
        course.LEVEL1 === 100 && course.LEVEL2 === 100 && course.LEVEL3 === 100
          ? { border: '2px solid var(--green)' }
          : course.LEVEL1 === 100
          ? { border: '2px solid var(--yellow)' }
          : { border: '2px solid transparent' }
      }
      className={styles.card}
      title={
        'Course: ' +
        course.COURSE_NAME.charAt(0).toUpperCase() +
        course.COURSE_NAME.slice(1).toLowerCase()
      }
      role="button"
      key={index}
      onClick={onClick}>
      {
        <div className={styles.text}>
          <IconMaker lang={course.COURSE_NAME} />
          <p className={styles.title}>
            {course.COURSE_NAME.charAt(0).toUpperCase() +
              (course.COURSE_NAME == 'OOPS' ? course.COURSE_NAME.slice(1) : course.COURSE_NAME.slice(1).toLowerCase())} Course
          </p>
        </div>
      }

      <div className={styles.levels}>
        <div className={styles.levelIndicator}>
          <p style={course.LEVEL1 === 100 ? { color: '#70FA70' } : {}}>
            {course.LEVEL1}
          </p>
          <div className={styles.progress}>
            <div style={{ width: `${course.LEVEL1}%` }}></div>
          </div>
        </div>
        <div className={styles.levelIndicator}>
          <p style={course.LEVEL2 === 100 ? { color: '#70FA70' } : {}}>
            {course.LEVEL2}
          </p>
          <div className={styles.progress}>
            <div style={{ width: `${course.LEVEL2}%` }}></div>
          </div>
        </div>
        <div className={styles.levelIndicator}>
          <p style={course.LEVEL3 === 100 ? { color: '#70FA70' } : {}}>
            {course.LEVEL3}
          </p>
          <div className={styles.progress}>
            <div style={{ width: `${course.LEVEL3}%` }}></div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
