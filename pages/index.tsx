import type { NextPage } from "next";
import Head from "next/head";
import NavigationBar from "../components/navigation/NavigationBar";
// ServersideProps imports
import { InferGetServerSidePropsType } from "next";
import { withSessionSsr } from "../library/Session";

export const getServerSideProps = withSessionSsr(
  // 👇️ this ignores any ts errors on the next line
  // @ts-ignore
  async function getServerSideProps({ req }) {
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
  }
);
const Home: NextPage = ({
  user,
  isLoggedIn,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <Head>
        <title>nemso - home</title>
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
