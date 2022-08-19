import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../library/session";
export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  // We use the login route to declare the data we want to store inside the cookie
  // get user from database then:
  try {
    req.session.user = {
      id: 230,
      admin: true,
    };
    await req.session.save();
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
