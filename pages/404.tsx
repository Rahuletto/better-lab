import styles from '@/styles/Error.module.css';
import { useRouter } from 'next/router';
import { TbError404 } from 'react-icons/tb';


export default function Error404() {
  const router = useRouter()

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 style={{ fontSize: '98px', color: "var(--yellow)" }}>
          <TbError404 />
        </h1>
        <h3>uh oh.</h3>
        <p>You are not supposed to be here comrade</p>
        <button
              className={styles.closebutton}
              type="button"
              style={{
                borderWidth: 1.8,
              }}
              onClick={() =>
                router.push('/')
              }
              title="Settings">
              Return to Home
            </button>
      </div>
    </main>
  );
}
