import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../library/Session";
import { NextApiRequest, NextApiResponse } from "next";

export type User = {
  isLoggedIn: boolean;
  id: number | null;
  username: string;
};

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  // We use the user route to get current logged in user data
  console.log(req.session);
  // console.log(req.session);
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    res.json({
      isLoggedIn: false,
      id: null,
      username: "",
    });
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
