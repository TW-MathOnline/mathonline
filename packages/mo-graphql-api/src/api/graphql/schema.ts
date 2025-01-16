import gql from "graphql-tag";
import { createSchema } from "graphql-yoga";
import pino from "pino";
import { Resolvers } from "../../__generated__/server/resolvers-types";
import { authMutation, authTypeDef } from "./schema/auth";
import { dateScalar } from "./schema/shared/dateScalar";
import { paginationType } from "./schema/shared/pagination";
import { scalarTypes } from "./schema/shared/scalarTypes";
import { uploadMutation } from "./schema/upload/mutation";
import { uploadTypeDef } from "./schema/upload/types";
import { userMutation } from "./schema/user/mutation";
import { userQuery } from "./schema/user/query";
import { userTypeDef } from "./schema/user/types";

export const resolvers: Resolvers = {
    Query: { ...userQuery },
    Mutation: {
        ...authMutation,
        ...userMutation,
        ...uploadMutation,
    },
    Date: dateScalar,
};

export const typeDefs = gql`
    type Query
    type Mutation

    scalar File

    ${userTypeDef}

    ${paginationType}
    ${scalarTypes}
    ${authTypeDef}
    ${uploadTypeDef}
`;

export const schema = createSchema({
    typeDefs,
    resolvers,
});

export type Logger = pino.Logger;

export interface ExtendedBaseContext {
    logger: Logger;
}
