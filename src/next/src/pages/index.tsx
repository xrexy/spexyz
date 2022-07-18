import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>speXYZ</title>
        <meta name="description" content="An URL shortner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>speXYZ starter (Nest.js)</h1>
      </div>
    </>
  );
};

export default Home;
