import { ApolloClient, ApolloLink, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { InMemoryCache } from "@apollo/experimental-nextjs-app-support";
import Cookies from "js-cookie";
import { COOKIE_KEY_USER_TOKEN } from "../utils/authUtils";
const httpLink = new HttpLink({
  uri:
    process.env.NEXT_PUBLIC_MO_API_ENDPOINT ??
    "http://localhost:4000/api/graphql",
});

export function makeClient() {
  return new ApolloClient({
    defaultOptions: {
      watchQuery: {
        nextFetchPolicy: "cache-and-network",
        fetchPolicy: "cache-and-network",
      },
    },
    cache: new InMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([httpLink])
        : authLink.concat(httpLink),
  });
}

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get(COOKIE_KEY_USER_TOKEN);

  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    },
  };
});
