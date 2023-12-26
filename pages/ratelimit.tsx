import styles from '@/styles/Error.module.css';
import { FaHourglassEnd } from 'react-icons/fa6';

export default function Ratelimit() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 style={{ fontSize: '98px', color: 'var(--yellow)' }}>
          <FaHourglassEnd />
        </h1>
        <h3>bruh.</h3>
        <p>Stop with the spams. You got ratelimited</p>
        <p style={{color: "var(--yellow)"}}>Repeating this periodically may result of blacklisting of your ip</p>

      </div>
    </main>
  );
}
