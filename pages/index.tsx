import Features from '@/components/PageComponents/Home/Features';
import Hero from '@/components/PageComponents/Home/Hero';

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
