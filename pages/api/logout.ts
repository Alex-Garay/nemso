import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../library/session";
import { NextApiRequest, NextApiResponse } from "next";
import type { User } from "./user";

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

function logoutRoute(
  req: NextApiRequest,
  res: NextApiResponse<{ isLoggedIn: boolean }>
) {
  req.session.destroy();
  res.json({ isLoggedIn: false });
}
