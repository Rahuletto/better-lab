import Hero from '@/components/Home/Hero';
import Features from '@/components/Home/Features';

import styles from '@/styles/Home.module.css';

export default function Login() {
  return (
    <>
      <main className={styles.main}>
        <Hero />
        <Features />
      </main>
    </>
  );
}
