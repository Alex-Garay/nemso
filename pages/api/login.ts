import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../library/session";
export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  // get user from database then:
  console.log("TOUCHING LOGIN API ROUTE");
  req.session.user = {
    id: 230,
    admin: true,
  };
  await req.session.save();
  res.send({ ok: true });
}
