import Link from "next/link";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../library/Session";
import { InferGetServerSidePropsType } from "next";
export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.user;

  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        user: { isLoggedIn: false, login: "", avatarUrl: "" },
      },
    };
  }

  return {
    props: { user: req.session.user },
  };
},
sessionOptions);
const NavigationBar = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const logged = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user", {
        method: "GET",
      });
      // console.log(response.body);
    } catch (error) {
      // console.log(error);
    }
  };

  logged();
  // console.log(user);
  return (
    <div className="navbar bg-base-200">
      <div className="flex-1 navbar-start">
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl text-white">nemso</a>
        </Link>
      </div>
      <div className="flex-none navbar-end">
        <ul className="menu menu-horizontal p-0">
          <li className="text-white">
            <Link href="/">
              <a>Home</a>
            </Link>
            <Link href="/auth/signin?">
              <a>Login</a>
            </Link>
            <Link href="/auth/signup?">
              <a>Signup</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default NavigationBar;
