import { FaQuestion } from 'react-icons/fa';
import styles from '@/styles/Error.module.css';
import { useRouter } from 'next/router';

export default function Error500() {
  const router = useRouter();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 style={{ fontSize: '98px', color: "var(--red)" }}>
          <FaQuestion />
        </h1>
        <h3>wait wha-</h3>
        <p>Sounds like a broken socket. Don{"'"}t get zapped.<br />Error 500</p>
        <button
          className={styles.closebutton}
          type="button"
          style={{
            borderWidth: 1.8,
          }}
          onClick={() => router.push('/')}
          title="Settings">
          Return to Home
        </button>
      </div>
    </main>
  );
}
