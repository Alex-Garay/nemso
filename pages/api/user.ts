import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../library/Session";
import { NextApiRequest, NextApiResponse } from "next";

export type User = {
  isLoggedIn: Boolean;
  username: string;
};

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  // We use the user route to get current logged in user data
  console.log(req.session);
  // console.log(req.session);
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      isLoggedIn: true,
      user: req.session.user,
    });
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
