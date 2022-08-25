import { useMutation, useQuery, gql, useLazyQuery } from "@apollo/client";

function RegisterUserHook(username: string, password: string): boolean {
  username = username.toLowerCase();
  const FIND_EXISTING_USER = gql`
      query {
        users(where: { username: "${username}" }) {
          id
          username
          password
        }
      }
    `;
  const [validateExisting, { called, loading, data }] =
    useLazyQuery(FIND_EXISTING_USER);
  // Boolean on whether the user has been found
  if (data.users.length !== 0) {
    console.log("FOUND AN EXISTING USER");
  }
}
export default RegisterUserHook;
