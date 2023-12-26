import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-loading-skeleton/dist/skeleton.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Analytics } from '@vercel/analytics/react';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { Component, useEffect } from 'react';
import ErrorStack from './error';

const jb = JetBrains_Mono({
  fallback: ['monospace'],
  weight: ['500', '700'],
  display: 'swap',
  style: ['normal'],
  subsets: ['latin'],
  variable: '--jb-font',
});
const space = Space_Grotesk({
  fallback: ['sans-serif'],
  weight: ['500', '700'],
  display: 'swap',
  style: ['normal'],
  subsets: ['latin'],
  variable: '--space',
});
const inter = Inter({
  fallback: ['sans-serif'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
  style: ['normal'],
  subsets: ['latin'],
  variable: '--main-font',
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      Array.from(
        document.getElementsByClassName(
          event.ctrlKey
            ? 'ctrl'
            : event.altKey
            ? 'alt'
            : event.shiftKey
            ? 'shift'
            : event.key
        )
      ).forEach((a) => {
        (a as HTMLElement).style.transform = 'scale(0.9)';
        (a as HTMLElement).style.opacity = '0.7';
      });
    });

    window.addEventListener('keyup', (event) => {
      Array.from(document.querySelectorAll('.key span')).forEach((a) => {
        (a as HTMLElement).style.transform = 'scale(1)';
        (a as HTMLElement).style.opacity = '1';
      });
    });
  }, []);

  return (
    <>
      <style jsx global>
        {`
          html {
            --jb-font: ${jb.style.fontFamily};
            --main-font: ${inter.style.fontFamily};
            --space: ${space.style.fontFamily};
          }
        `}
      </style>

      <Head>
        <title>Better-Lab</title>
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/favicon.svg"></link>
        <link rel="manifest" href="/manifest.json" />
        {/* PWA */}
        <meta name="application-name" content="Better-Lab" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Better-Lab" />
        <meta
          name="description"
          content="A better alternative to SRM-Elab made by the SRM DLD (Directorate of Learning and Development) team."
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#12161c" />
        <meta name="msapplication-tap-highlight" content="no" />

        <meta
          name="description"
          content="A better alternative to SRM-Elab made by the SRM DLD (Directorate of Learning and Development) team."
        />

        <meta property="theme-color" content="#12161c" />
        <meta property="og:color" content="#a0aab6" />

        <meta property="og:url" content="https://better-lab.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Better-Lab" />
        <meta
          property="og:description"
          content="A better alternative to SRM-Elab made by the SRM DLD (Directorate of Learning and Development) team."
        />
        <meta property="og:image" content="/og.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="better-lab.vercel.app" />
        <meta property="twitter:url" content="https://better-lab.vercel.app" />
        <meta name="twitter:title" content="Better-Lab" />
        <meta
          name="twitter:description"
          content="A better alternative to SRM-Elab made by the SRM DLD (Directorate of Learning and Development) team."
        />
        <meta name="twitter:image" content="/og.png" />
        <meta name="twitter:creator" content="@SRMStudents" />

        <meta name="google-site-verification" content="0Cmv3J0IwkFN7JLhsv8jWAnIlX3SaPHFrlIlWy4kzK4" />
      </Head>

      <Analytics />
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </>
  );
}

type ErrorBound = {
  hasError: boolean;
  error: Error;
};
class ErrorBoundary extends Component {
  constructor(props: ErrorBound | Readonly<ErrorBound>) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error };
  }
  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    console.warn({ error, errorInfo });
  }
  render() {
    if ((this.state as ErrorBound).hasError) {
      return <ErrorStack error={(this.state as ErrorBound).error} />;
    }
    // @ts-ignore
    return this.props.children;
  }
}
