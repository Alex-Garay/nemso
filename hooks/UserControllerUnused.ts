import { useMutation, useQuery, gql, useLazyQuery } from "@apollo/client";
import client from "../library/GraphqlClient";
import React from "react";
class UserController {
  private username: string;
  private password: string;
  private client: any;
  constructor(username: Required<string>, password: Required<string>) {
    (this.username = username.toLocaleLowerCase()), (this.password = password);
    this.client = client;
  }

  // Checks if the current user already exists in our database!
  public exists() {
    const FIND_EXISTING_USER = gql`
      query {
        users(where: { username: "${this.username}" }) {
          id
          username
          password
        }
      }
    `;
    const [validateExisting, { called, loading, data }] =
      useLazyQuery(FIND_EXISTING_USER);
    // Boolean on whether the user has been found
    if (!loading && data.users.length === 0) {
      return false;
    } else if (!loading && data.users.length > 0) {
      return true;
    }
  }

  public create(): boolean {
    if (!this.exists()) {
      const SIGNUP_USER = gql`
        mutation Create($username: String!, $password: String!) {
          SignUp(input: { username: $username, password: $password }) {
            user {
              username
            }
          }
        }
      `;
      const [SIGNUP_USER_MUTATION, { data, loading, error }] =
        useMutation(SIGNUP_USER);

      SIGNUP_USER_MUTATION({
        variables: {
          username: `${this.username}`,
          password: `${this.password}`,
        },
      });

      if (error) {
        return false;
      } else {
        return data;
      }
    } else {
      return false;
    }
  }
}
export default UserController;
