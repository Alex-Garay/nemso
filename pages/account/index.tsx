import NavigationBar from "../../components/navigation/NavigationBar";

// ServersideProps imports
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../library/Session";
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
const Account = ({
  user,
  isLoggedIn,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <NavigationBar
        authentication={{
          isLoggedIn: isLoggedIn,
          user: user,
        }}
      />
      <h1>Hello</h1>
    </div>
  );
};

export default Account;
