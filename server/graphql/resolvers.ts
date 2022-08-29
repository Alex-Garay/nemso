import { User } from "../library/database";
import bcrypt from "bcrypt";
import "dotenv/config";
export const resolvers = {
  Mutation: {
    SignUp: async (_parent: any, args: any) => {
      // Destructing to get our username and password
      const { username, password } = args.input;
      // Using bcrypt to hash our password
      const passwordHashed = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_SALT_ROUNDS)
      );
      try {
        const { users: user } = await User.create({
          input: {
            username: username,
            password: passwordHashed,
          },
        });
        console.log(user);
        // Return success and user information
        return {
          success: true,
          user: {
            id: user[0].id,
            username: user[0].username,
          },
        };
      } catch (error) {
        // We have failed to create the user!
        return {
          success: false,
        };
      }
    },
  },
};
