import {
    Maybe,
    QueryFindUserArgs,
    User,
} from "../../../../__generated__/server/resolvers-types";
import { ExtendedBaseContext } from "../../schema";
import { fetchUsers } from "./crud";

export const userQuery = {
    findUser: async (
        parent: unknown,
        args: QueryFindUserArgs,
        { logger }: ExtendedBaseContext,
        info: unknown,
    ): Promise<Maybe<User>> => {
        logger.info({ args }, "Resolving collections");
        throw "Not implemened";
    },
    users: async (
        parent: unknown,
        args: unknown,
        { logger }: ExtendedBaseContext,
        info: unknown,
    ): Promise<User[]> => {
        logger.info({ args }, "Resolving users");
        return fetchUsers();
    },
};
