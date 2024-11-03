import gql from "graphql-tag";
import { createSchema } from "graphql-yoga";
import pino from "pino";
import { Resolvers } from "../../__generated__/server/resolvers-types";
import { dateScalar } from "./schema/shared/dateScalar";
import { paginationType } from "./schema/shared/pagination";
import { scalarTypes } from "./schema/shared/scalarTypes";
import { userQuery } from "./schema/user/query";
import { userTypeDef } from "./schema/user/types";

export const resolvers: Resolvers = {
    Query: { ...userQuery },
    Mutation: {},
    Date: dateScalar,
};

export const typeDefs = gql`
    type Query
    type Mutation

    ${userTypeDef}

    ${paginationType}
    ${scalarTypes}
`;

export const schema = createSchema({
    typeDefs,
    resolvers,
});

export interface ExtendedBaseContext {
    logger: pino.Logger;
}
