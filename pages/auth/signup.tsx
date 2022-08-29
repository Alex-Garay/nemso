import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { useMutation, gql, useLazyQuery } from "@apollo/client";
import NavigationBar from "../../components/navigation/NavigationBar";
import { useRouter } from "next/router";
import Head from "next/head";
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

const SignUpPage: NextPage = ({
  user,
  isLoggedIn,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  // Checks our session from our serversideprops if we are logged in then navigates home if logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  });

  // State nanagement for our inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [foundExistingUser, setFoundExistingUser] = useState(false);

  const CREATE_USER = gql`
    mutation SignUpMutation($username: String!, $password: String!) {
      SignUp(input: { username: $username, password: $password }) {
        success
        user {
          id
          username
        }
      }
    }
  `;
  const [createUserMutation, { data, loading, error }] = useMutation(
    CREATE_USER,
    {
      onCompleted: async (data) => {
        // We've received a success true from our mutation indicating the user has been successfully created
        if (data.SignUp.success) {
          const { id, username } = data.SignUp.user;
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
          setFoundExistingUser(true);
        }
      },
    }
  );
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Calling our create user mutation with our input from state
    createUserMutation({
      variables: {
        username: username,
        password: password,
      },
    });
    setFoundExistingUser(false);
  };

  return (
    <div>
      <Head>
        <title>nemso - signup</title>
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
              <h2 className="card-title">Hello, Welcome to Nemso!</h2>
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
                {foundExistingUser ? (
                  <h1 className="text-error mb-3">User already exists!</h1>
                ) : null}
                <button
                  className={`btn btn-primary btn-wide btn-square ${
                    loading ? "btn-square loading" : null
                  }`}
                >
                  {loading ? "loading" : "Signup"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default SignUpPage;
