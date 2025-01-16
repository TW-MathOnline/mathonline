import { gql } from "graphql-tag";

export const userTypeDef = gql`
    """
    A User
    """
    type User {
        "The id of the user"
        username: ID!
        role: UserRole!
    }

    enum UserRole {
        BASIC
        ADVANCED_USER
    }

    input FindUserInput {
        username: ID!
    }

    input CreateUserInput {
        username: ID!
    }

    input UpdateUserInput {
        username: String!
        role: UserRole!
    }

    extend type Query {
        findUser(data: FindUserInput!): User
        users: [User!]!
    }

    extend type Mutation {
        register(data: CreateUserInput!): User!
        updateUser(data: UpdateUserInput!): User!
        deleteUser(username: String!): User!
    }
`;
