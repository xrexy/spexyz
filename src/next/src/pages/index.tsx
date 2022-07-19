import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>speXYZ - Homepage</title>
        <meta name="description" content="A link shortener built in five different frameworks." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-2xl font-bold">
        speXYZ starter (Next.js)
      </main>
    </>
  );
};

export default Home;
