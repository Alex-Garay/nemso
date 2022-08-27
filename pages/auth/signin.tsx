import { useState, useEffect } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { NextPage } from "next";
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

const LoginPage: NextPage = ({
  user,
  isLoggedIn,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // State management of username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // NextJs router to manage routes
  const router = useRouter();

  // user is logged in, redirect them away from login page.
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  });

  // Graphql Client query that matches username and password - Need to implement hashed bycrypt passwords
  const GET_USER = gql`
    query getUser($username: String!, $password: String!) {
      users(where: { username: $username, password: $password }) {
        id
        username
        password
      }
    }
  `;
  // When matching credentials are matching, we will request a cookie from the /login/ api endpoint.
  const [validateExisting, { called, loading, data }] = useLazyQuery(GET_USER, {
    onCompleted: async (data) => {
      // Validate that credentials are valid.
      if (data && data.users.length === 1) {
        console.log("Completed: Valid Credentials");
        // Data we want inside of our cookie.
        const body = {
          id: data.users[0].id,
          username: username,
        };
        // Send our data we want inside our cookie and receive back a cookie.
        try {
          await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          router.push("/");
        } catch (error) {
          console.error("An unexpected error happened:", error);
        }
      }
    },
  });

  // Handles submit
  const handleSubmit = async (event: any) => {
    // Prevent page from refreshing when clicking button
    event.preventDefault();
    // resets the password
    setPassword("");
    // Variables are needed to prevent a bug - SEE: https://github.com/apollographql/apollo-client/issues/5912
    validateExisting({
      variables: {
        username: username,
        password: password,
      },
    });
  };
  return (
    <div>
      <NavigationBar
        authentication={{
          isLoggedIn: isLoggedIn,
          user: user,
        }}
      />
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
              {data && data.users.length === 0 ? (
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
    </div>
  );
};
export default LoginPage;
