import { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Head from "next/head";
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

const LoginPage: NextPage = ({
  user,
  isLoggedIn,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // State management of username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  // NextJs router to manage routes
  const router = useRouter();

  // user is logged in, redirect them away from login page.
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  });

  const LOGIN_USER = gql`
    mutation SignInMutation($username: String!, $password: String!) {
      SignIn(input: { username: $username, password: $password }) {
        success
        user {
          id
          username
        }
      }
    }
  `;
  const [loginUserMutation, { data, loading, error }] = useMutation(
    LOGIN_USER,
    {
      onCompleted: async (data) => {
        console.log(data);
        // We've received a success true from our mutation indicating the user has been successfully created
        if (data.SignIn.success) {
          const { id, username } = data.SignIn.user;
          const body = {
            id,
            username,
          };
          // Calling /api/login creates a session cookie for us with our id and username
          try {
            await fetch("/api/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            });
            // navigates us home
            router.push("/");
          } catch (error) {
            console.error("An unexpected error happened:", error);
          }
        } else {
          setInvalidCredentials(true);
        }
      },
    }
  );

  // Handles submit
  const handleSubmit = async (event: any) => {
    // Prevent page from refreshing when clicking button
    event.preventDefault();
    loginUserMutation({
      variables: {
        username,
        password,
      },
    });
    // resets the password
    setPassword("");
    setInvalidCredentials(false);
  };
  return (
    <div>
      <Head>
        <title>nemso - signin</title>
        <meta name="description" content="nemso fitness marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationBar
        authentication={{
          isLoggedIn: isLoggedIn,
          user: user,
        }}
      />
      <main>
        <div className="grid justify-items-center items-center h-screen -mt-36">
          <div className="card w-96 bg-base-200 shadow-xl ">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Hello, Welcome Back!</h2>
              <form
                onSubmit={(event) => {
                  handleSubmit(event);
                }}
              >
                <input
                  required={true}
                  type="text"
                  placeholder="@username"
                  className="input input-bordered input-primary w-full max-w-xs mb-4"
                  // On change of our input, it stored our value using our setUsername state
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                  value={username}
                />
                <input
                  required={true}
                  type="password"
                  placeholder="password"
                  className="input input-bordered input-primary w-full max-w-xs mb-4"
                  // On change of our input, it stored our value using our setPassword state
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  value={password}
                />
                {invalidCredentials ? (
                  <h1 className="text-error mb-4">Invalid Credentials</h1>
                ) : null}
                <button
                  className={`btn btn-primary btn-wide btn-square ${
                    loading ? "btn-square loading" : null
                  }`}
                >
                  {loading ? "loading" : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default LoginPage;
