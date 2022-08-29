import NavigationBar from "../../components/navigation/NavigationBar";

// ServersideProps imports
import { InferGetServerSidePropsType } from "next";
import { withSessionSsr } from "../../library/Session";

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
