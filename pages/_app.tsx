import type { AppProps } from "next/app";
import Head from "next/head";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {" "}
      <Head>
        <title>Nerdle</title>
      </Head>
      <Component {...pageProps} />
      <div id="overlays"></div>
    </>
  );
}

export default MyApp;
