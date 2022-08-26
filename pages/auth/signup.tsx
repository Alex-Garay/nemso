import React, { useState } from "react";
import { NextPage } from "next";
import { useMutation, gql, useLazyQuery } from "@apollo/client";
import NavigationBar from "../../components/navigation/NavigationBar";
const SignUpPage: NextPage = () => {
  // State nanagement for our inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
        console.log("Completed");
      },
    }
  );
  // Checks the returned data to check if a user exists
  if (data && data.users.length !== 0) {
    console.log("FOUND AN EXISTING USER");
  }

  // {
  //   data && data.users.length !== 0 ? (
  //     <Typography variant="small" color="red">
  //       User Already Exists
  //     </Typography>
  //   ) : null;
  // }
  return (
    <div>
      <NavigationBar />
    </div>
  );
};
export default SignUpPage;
