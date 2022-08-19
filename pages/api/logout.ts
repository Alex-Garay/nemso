import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../library/session";
import { NextApiRequest, NextApiResponse } from "next";

function logoutRoute(
  req: NextApiRequest,
  res: NextApiResponse<{ isLoggedIn: false }>
) {
  req.session.destroy();
  res.json({ isLoggedIn: false });
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
