import { gql } from "@/__generated__/client";

export const UPDATE_USER_MUTATION = gql(/* GraphQL */ `
  mutation UpdateUser($data: UpdateUserInput!) {
    updateUser(data: $data) {
      username
      role
    }
  }
`);

export const DELETE_USER_MUTATION = gql(/* GraphQL */ `
  mutation DeleteUser($username: String!) {
    deleteUser(username: $username) {
      username
      role
    }
  }
`);
