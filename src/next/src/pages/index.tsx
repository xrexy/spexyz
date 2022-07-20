import type { NextPage } from "next";
import Head from "next/head";
import { Suspense } from "react";
import XYZInput from "../components/input";

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

      <main className="flex h-screen pl-4 pr-4 flex-col items-center justify-center bg-white">
        <Suspense>
          <XYZInput
            leftSection={{ placeholder: "https://spexyz.vercel.com/" }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mb-4 mt-4 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
            />
          </svg>

          <XYZInput />

          <button className="mt-4 rounded border border-blue-500 bg-transparent py-2 px-4 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white">
            Generate
          </button>
        </Suspense>
      </main>
    </>
  );
};

export default Home;
