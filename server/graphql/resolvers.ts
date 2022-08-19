import { User } from "../library/database";
export const resolvers = {
  Mutation: {
    SignUp: async (_parent: any, args: any) => {
      const { username, password } = args.input;
      const { users: user } = await User.create({
        input: {
          username: username,
          password: password,
        },
      });
      console.log(user);
      return {
        authenticated: true,
        user: {
          username: user[0].username,
        },
      };
    },
  },
};
