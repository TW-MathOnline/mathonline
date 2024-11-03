import { gql } from "graphql-tag";

export const userTypeDef = gql`
    """
    A User
    """
    type User {
        "The id of the user"
        username: ID!
    }

    input FindUserInput {
        username: ID!
    }

    input CreateUserInput {
        username: ID!
    }

    extend type Query {
        findUser(data: FindUserInput!): User
    }

    extend type Mutation {
        register(data: CreateUserInput!): User!
    }
`;
