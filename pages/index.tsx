import type { NextPage } from "next";
import Head from "next/head";
import { Button } from "@material-tailwind/react";
import { useMutation, useQuery, gql } from "@apollo/client";
const Home: NextPage = () => {
  // const CreateUser = gql`
  //   mutation Create($username: String!, $password: String!) {
  //     SignUp(input: { username: $username, password: $password }) {
  //       user {
  //         username
  //       }
  //     }
  //   }
  // `;
  const nas: string = "costanza";
  const FindUser = gql`
    query {
      users(where: { username: ${nas} }) {
        id
        username
        password
      }
    }
  `;

  // const [mutateFunction, { data, loading, error }] = useMutation(CreateUser);
  // if (loading) return <p>Loading...</p>;

  // if (error) return <p>Error: {error}</p>;
  const { loading, error, data } = useQuery(FindUser);
  if (loading) return "Loading...";

  if (error) return `Error! ${error.message}`;

  if (data) {
    if (data.users) {
      console.log("Found a user!");
    }
  }

  return (
    <div>
      <Head>
        <title>nemso</title>
        <meta name="description" content="nemso fitness marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Button
          onClick={() => {
            mutateFunction({
              variables: { username: "Hello", password: "password" },
            });
          }}
        >
          Button
        </Button>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
