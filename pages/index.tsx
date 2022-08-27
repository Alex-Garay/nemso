import type { NextPage } from "next";
import Head from "next/head";
import NavigationBar from "../components/navigation/NavigationBar";
// ServersideProps imports
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../library/Session";
import { InferGetServerSidePropsType } from "next";

export const getServerSideProps = withIronSessionSsr(function ({ req, res }) {
  const user = req.session.user;

  if (user === undefined) {
    return {
      props: {
        isLoggedIn: false,
      },
    };
  }

  return {
    props: {
      isLoggedIn: true,
      user: req.session.user,
    },
  };
}, sessionOptions);
const Home: NextPage = ({
  user,
  isLoggedIn,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <Head>
        <title>nemso</title>
        <meta name="description" content="nemso fitness marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <NavigationBar
          authentication={{
            isLoggedIn: isLoggedIn,
            user: user,
          }}
        />
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
