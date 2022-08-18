import type { NextPage } from "next";
import Head from "next/head";
import { Button } from "@material-tailwind/react";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>nemso</title>
        <meta name="description" content="nemso fitness marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Button>Button</Button>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
