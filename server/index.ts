import { ApolloServer } from "apollo-server";
import { neoSchema, ogm } from "./library/database";

Promise.all([neoSchema.getSchema(), ogm.init()]).then(([schema]) => {
  neoSchema.assertIndexesAndConstraints({ options: { create: true } });
  const server = new ApolloServer({
    schema,
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
});
