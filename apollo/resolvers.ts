import { Neo4jGraphQL } from "@neo4j/graphql";

export default {
  Query: {
    getUser: () => {
      return {
        id: "Foo",
      };
    },
  },
};
