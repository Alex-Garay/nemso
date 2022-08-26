import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../library/Session";
export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: any, res: NextApiResponse) {
  // We use the login route to declare the data we want to store inside the cookie
  // get user from database then:
  console.log("TOUCHING LOGIN PAGE");

  req.session.user = {
    id: 230,
    username: "George",
  };
  await req.session.save();
  res.send({ ok: true });
}
