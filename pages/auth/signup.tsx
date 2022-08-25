import React, { useState } from "react";
import { NextPage } from "next";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useMutation, gql, useLazyQuery } from "@apollo/client";
const SignUpPage: NextPage = () => {
  // State nanagement for our inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Graphql query to find if the username already exists in the database
  const FIND_EXISTING_USER = gql`
    query {
      users(where: { username: "${username}" }) {
        id
        username
        password
      }
    }
  `;
  // Using regular useQuery throws an error about hook rule violations, HAVE to use useLazyQuery:
  // useLazyQuery will run everytime username or password state changes.
  // Refer to: https://www.apollographql.com/docs/react/api/react/hooks/#uselazyquery
  const [validateExisting, { called, loading, data }] =
    useLazyQuery(FIND_EXISTING_USER);
  // Checks the returned data to check if a user exists
  if (data && data.users.length !== 0) {
    console.log("FOUND AN EXISTING USER");
  }
  // Runs each time our useLazyQuery hook runs
  if (called) {
    console.log("ITS BEING CALLED");
  }
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          validateExisting();
        }}
        className="w-64 m-5"
      >
        <Typography variant="h5" color="blue-gray">
          Register
        </Typography>
        <Input
          label="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          label="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {data && data.users.length !== 0 ? (
          <Typography variant="h8" color="red">
            User Already Exists
          </Typography>
        ) : null}
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};
export default SignUpPage;
