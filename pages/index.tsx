import styles from '@/styles/Home.module.css';
import Link from 'next/link';

import { HiLightningBolt } from 'react-icons/hi';
import { PiShieldWarningFill } from 'react-icons/pi';

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.hero}>
          <HiLightningBolt className={styles.bolt} />
          <div className={styles.tag}>
            <h1>Better-Lab</h1>
            <p>
              A better alternative to SRM-Elab. Efficient, Fast, Zippy as hecc
            </p>
          </div>
          <div className={styles.buttons}>
            <Link className={styles.login} href="/login">
              Login
            </Link>
            <Link className={styles.course} href="/course">
              Courses
            </Link>
          </div>
        </div>

        <div className={styles.features}>
          <div>
            <h3 style={{ opacity: 0.9 }}>Why Better-Lab ?</h3>
            <ul>
              <li>Mobile-First approach</li>
              <li>Fast, Zippy and RAM Friendly</li>
              <li>
                Efficient <span>{'(~90% performance improvements)'}</span>
              </li>
              <li>Better User-Experience</li>
              <li>Auto Sync and Save with SRM Elab</li>
              <li>Support for all browsers</li>
            </ul>
          </div>
          <div>
            <h3 style={{ opacity: 0.9 }}>Idea behind</h3>
            <p>
              We made Better-Lab as we got frustrated to their buggy interface
              with RAM-hogging code editor (SRM uses Cloud9 Web IDE by AWS which
              is considered the worst web ide possible). So we decided to build
              with the knowledge we had.
            </p>
          </div>
          <blockquote className={styles.blockquotewarn}>
            <PiShieldWarningFill />
            <p>
              We scrape the information from DLD Elab, This website acts as a
              wrapper and does not store any information whatsoever!
            </p>
          </blockquote>
        </div>
      </main>
    </>
  );
}
