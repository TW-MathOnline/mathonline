import { gql } from "graphql-tag";

export const authTypeDef = gql`
    type AuthPayload {
        token: String!
        refreshToken: String!
    }

    extend type Mutation {
        login(username: String!, password: String!): AuthPayload!
        refreshToken(refreshToken: String!): AuthPayload!
    }
`;
