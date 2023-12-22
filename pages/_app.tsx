import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.css';
import "react-loading-skeleton/dist/skeleton.css";

import type { AppProps } from "next/app";
import Head from "next/head"

import { Analytics } from "@vercel/analytics/react";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { useEffect } from "react";

const jb = JetBrains_Mono({
  fallback: ["monospace"],
  weight: ["500", "700"],
  display: "swap",
  style: ["normal"],
  subsets: ["latin"],
  variable: "--jb-font",
});
const space = Space_Grotesk({
  fallback: ["sans-serif"],
  weight: ["500", "700"],
  display: "swap",
  style: ["normal"],
  subsets: ["latin"],
  variable: "--space",
});
const inter = Inter({
  fallback: ["sans-serif"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  style: ["normal"],
  subsets: ["latin"],
  variable: "--main-font",
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      Array.from(
        document.getElementsByClassName(
          event.ctrlKey
            ? "ctrl"
            : event.altKey
            ? "alt"
            : event.shiftKey
            ? "shift"
            : event.key
        )
      ).forEach((a) => {
        (a as HTMLElement).style.transform = "scale(0.9)";
        (a as HTMLElement).style.opacity = "0.7";
      });
    });

    window.addEventListener("keyup", (event) => {
      Array.from(document.querySelectorAll(".key span")).forEach((a) => {
        (a as HTMLElement).style.transform = "scale(1)";
        (a as HTMLElement).style.opacity = "1";
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
        <link rel="icon" type="image/x-icon" href="/favicon.svg"></link>
      </Head>

      <Analytics />
      <Component {...pageProps} />
    </>
  );
}