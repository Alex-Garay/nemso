// import type { NextPage } from "next";
// import Head from "next/head";
// import { Button } from "@material-tailwind/react";
// import { withIronSessionSsr } from "iron-session/next";
// import { sessionOptions } from "../library/session";
// import { InferGetServerSidePropsType } from "next";
// export const getServerSideProps = withIronSessionSsr(async function ({
//   req,
//   res,
// }) {
//   const user = req.session.user;

//   if (user === undefined) {
//     res.setHeader("location", "/login");
//     res.statusCode = 302;
//     res.end();
//     return {
//       props: {
//         user: { isLoggedIn: false, login: "", avatarUrl: "" },
//       },
//     };
//   }

//   return {
//     props: { user: req.session.user },
//   };
// },
// sessionOptions);

// const Home = ({
//   user,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
//   // const logged = async () => {
//   //   try {
//   //     const response = await fetch("http://localhost:3000/api/user", {
//   //       method: "GET",
//   //     });
//   //     console.log(response);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//   // logged();
//   console.log(user);
//   return (
//     <div>
//       <Head>
//         <title>nemso</title>
//         <meta name="description" content="nemso fitness marketplace" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main>
//         <h1 className="text-3xl font-bold underline">Hello world!</h1>
//         <Button>Button</Button>
//       </main>

//       <footer></footer>
//     </div>
//   );
// };

// export default Home;

const placeholder = () => {
  return <h1>Hello</h1>;
};

export default placeholder;
