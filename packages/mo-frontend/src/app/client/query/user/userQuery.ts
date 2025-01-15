import { gql } from "@/__generated__/client/gql";

export const USERS_QUERY = gql(/* GraphQL */ `
  query Users {
    users {
      username
      role
    }
  }
`);
