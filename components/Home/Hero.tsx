import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import { HiLightningBolt } from 'react-icons/hi';


export default function Hero() {
    return (
      <div className={styles.container}>
        <div>
          <h1>Better-Lab</h1>
          <p>
            A better alternative to SRM-Elab made by the SRM DLD{' '}
            {'(Directorate of Learning and Development)'} team.
          </p>
  
          <div className={styles.buttons}>
            <Link className={styles.login} href="/login">
              Login
            </Link>
            <Link className={styles.course} href="/course">
              Courses
            </Link>
          </div>
        </div>
        <HiLightningBolt />
      </div>
    );
  }