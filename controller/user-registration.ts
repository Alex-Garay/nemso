import { useMutation, useQuery, gql } from "@apollo/client";
import client from "../library/graphql-client";
class UserController {
  username: string;
  password: string;
  client: any;
  constructor(username: string, password: string) {
    (this.username = username), (this.password = password);
    this.client = client;
  }

  exists(): boolean {
    const FindUser = gql`
    query {
      users(where: { username: ${this.username} }) {
        id
        username
        password
      }
    }
  `;
    const { loading, error, data } = useQuery(FindUser);

    if (data.users) {
      return true;
    } else {
      return false;
    }
  }
}
export default UserController;
