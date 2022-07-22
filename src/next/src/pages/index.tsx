import type { NextPage } from "next";
import Head from "next/head";
import { Suspense } from "react";
import HomepageComponent from "../components/HomepageComponent";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>speXYZ - Homepage</title>
        <meta
          name="description"
          content="A link shortener built in five different frameworks."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense>
        <HomepageComponent />
      </Suspense>
    </>
  );
};

export default Home;
