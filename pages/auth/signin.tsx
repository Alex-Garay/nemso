import { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import {
  Button,
  Input,
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Checkbox,
} from "@material-tailwind/react";
const LoginPage: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      {/* <form
        onSubmit={async function handleSubmit(event) {
          event.preventDefault();

          const body = {
            username: username,
            password: password,
          };

          try {
            await fetch("/api/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            });
          } catch (error) {
            console.error("An unexpected error happened:", error);
          }
        }}
        className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
      >
        <Typography variant="h5" color="blue-gray">
          Welcome back, signin!
        </Typography>
        <Input
          label="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          label="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </form> */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(username, password);
        }}
      >
        <Card className="w-96">
          <div className="text-center">
            <Typography variant="h6" color="blue-gray">
              Welcome back, signin!
            </Typography>
          </div>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Email"
              size="lg"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              label="Password"
              size="lg"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth color="indigo" type="submit">
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue"
                className="ml-1 font-bold"
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};
export default LoginPage;
