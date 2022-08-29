import { User } from "../library/database";
import bcrypt from "bcrypt";
import "dotenv/config";
export const resolvers = {
  Mutation: {
    SignIn: async (_parent: any, args: any) => {
      const { username, password } = args.input;

      try {
        // Find if user exists
        const user = await User.find({
          where: { username: username },
        });
        // Compare our input password with our database's hashed password
        const compare: boolean = await bcrypt.compare(
          password,
          user[0].password
        );
        // Return user information if credentials match
        if (compare) {
          return {
            success: true,
            user: {
              id: user[0].id,
              username: user[0].username,
            },
          };
          // Credentials did not match so return false
        } else {
          return {
            success: false,
          };
        }
      } catch (error) {
        return {
          success: false,
        };
      }
      // Use bcrypt to compare our input password with our database hashed password
      // respond with success, user.id, user.username
    },
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
