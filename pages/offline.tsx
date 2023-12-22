import { IoCloudOffline } from "react-icons/io5";
import styles from '@/styles/Error.module.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function error() {
  const router = useRouter();

  useEffect(() => {
    fetch('/api/status')
      .then((d) => d.json())
      .then((a) => {
        if(a.Status == 1) router.push('/');
        
      });
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 style={{ fontSize: '98px', color: 'var(--red)' }}>
          <IoCloudOffline />
        </h1>
        <h3>oops.</h3>
        <p>Seems like SRM is asleep Zzz..</p>

      </div>
    </main>
  );
}
