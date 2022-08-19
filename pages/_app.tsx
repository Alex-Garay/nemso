import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@material-tailwind/react";
import { ApolloProvider } from "@apollo/client";
import client from "../library/graphql-client";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default MyApp;
