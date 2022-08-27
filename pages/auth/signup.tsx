import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { useMutation, gql, useLazyQuery } from "@apollo/client";
import NavigationBar from "../../components/navigation/NavigationBar";
import Router, { useRouter } from "next/router";

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

const SignUpPage: NextPage = ({
  user,
  isLoggedIn,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  useEffect(() => {
    if (isLoggedIn) {
      Router.push("/");
    }
  });
  // State nanagement for our inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [foundExistingUser, setFoundExistingUser] = useState(false);
  // Graphql query to find if the username already exists in the database
  const FIND_EXISTING_USER = gql`
    query Users($username: String!) {
      users(where: { username: $username }) {
        id
        username
        password
      }
    }
  `;
  // Using regular useQuery throws an error about hook rule violations, HAVE to use useLazyQuery:
  // useLazyQuery will run everytime username or password state changes.
  // Refer to: https://www.apollographql.com/docs/react/api/react/hooks/#uselazyquery
  const [validateExisting, { called, loading, data }] = useLazyQuery(
    FIND_EXISTING_USER,
    {
      onCompleted: (data) => {
        console.log(data);
        console.log("Completed");
        if (data && data.users.length !== 0) {
          setFoundExistingUser(true);
        }
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    validateExisting({
      fetchPolicy: "no-cache",
      variables: {
        username: username,
      },
    });
    setFoundExistingUser(false);
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
    </div>
  );
};
export default SignUpPage;
