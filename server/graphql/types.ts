const { gql } = require("apollo-server");

export const typeDefs = gql`
  type User {
    id: ID @id
    username: String! @unique
    password: String!
  }
  input UserInput {
    username: String!
    password: String!
  }
  type AuthenticationUser {
    id: ID
    username: String!
  }
  type Authentication {
    success: Boolean!
    user: AuthenticationUser
  }
  type Mutation {
    SignUp(input: UserInput): Authentication
  }
  type Mutation {
    LogIn(input: UserInput): Authentication
  }
`;
