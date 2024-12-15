import { gql } from "@/__generated__/client/gql";

export const REFRESH_TOKEN_MUTATION = gql(/* GraphQL */ `
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      refreshToken
      token
    }
  }
`);
