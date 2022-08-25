import { useState } from "react";
import { NextPage } from "next";
import { Button, Input, Typography } from "@material-tailwind/react";
const LoginPage: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <form
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
        className="w-64 m-5"
      >
        <Typography variant="h5" color="blue-gray">
          Login
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
      </form>
    </div>
  );
};
export default LoginPage;
