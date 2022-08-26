import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../library/Session";
export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: any, res: NextApiResponse) {
  // We use the login route to declare the data we want to store inside the cookie
  // get user from database then:
  const { id, username } = req.body;
  console.log(id, username);
  req.session.user = {
    id: id,
    username: username,
  };
  await req.session.save();
  res.send({ ok: true });
}
