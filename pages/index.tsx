import type { NextPage } from "next";
import Head from "next/head";
import NavigationBar from "../components/navigation/NavigationBar";
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>nemso</title>
        <meta name="description" content="nemso fitness marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <NavigationBar />
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
