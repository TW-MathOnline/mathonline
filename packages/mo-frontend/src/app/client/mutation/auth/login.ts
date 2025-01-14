import { gql } from "@/__generated__/client/gql";

export const LOGIN_MUTATION = gql(/* GraphQL */ `
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      refreshToken
    }
  }
`);
