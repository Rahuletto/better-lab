import styles from '@/styles/Home.module.css';
import { PiShieldWarningFill } from 'react-icons/pi';

export default function Features() {
  return (
    <div className={styles.features}>
      <div>
        <h2 style={{ opacity: 0.9 }}>Why Better-Lab ?</h2>
        <ul>
          <li>Mobile-First approach</li>
          <li>Faster and Snappier animations</li>
          <li>
            Efficient <span>{'(~90% performance improvements)'}</span>
          </li>
          <li>Better User-Experience</li>
          <li>Auto Sync with SRM Elab</li>
          <li>Support for all browsers possible</li>
        </ul>
      </div>
      <div>
        <h3 style={{ opacity: 0.9 }}>To the nerds out there</h3>
        <blockquote className={styles.blockquote}>
          <p>
            We made Better-Lab as we got frustrated to their buggy interface
            with RAM-hogging code editor (SRM uses Cloud9 Web IDE by AWS which
            is considered the worst web ide possible). So we decided to build
            with the knowledge we had.
          </p>
        </blockquote>

        <blockquote className={styles.blockquotewarn}>
          <PiShieldWarningFill />
          <p>
            We scrape the information from DLD Elab, This website acts as a
            wrapper and does not store any information whatsoever!
          </p>
        </blockquote>
      </div>
    </div>
  );
}
