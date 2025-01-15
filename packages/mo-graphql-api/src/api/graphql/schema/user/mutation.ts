import {
    MutationDeleteUserArgs,
    MutationUpdateUserArgs,
    User,
} from "../../../../__generated__/server/resolvers-types";
import { ExtendedBaseContext } from "../../schema";
import { deleteUser, updateUser } from "./crud";

export const userMutation = {
    updateUser: async (
        parent: unknown,
        args: MutationUpdateUserArgs,
        { logger }: ExtendedBaseContext,
        info: unknown,
    ): Promise<User> => {
        logger.info({ args }, "Resolving updateUser mutation");
        return updateUser(args.data);
    },
    deleteUser: async (
        parent: unknown,
        args: MutationDeleteUserArgs,
        { logger }: ExtendedBaseContext,
        info: unknown,
    ): Promise<User> => {
        logger.info({ args }, "Resolving deleteUser mutation");
        return deleteUser(args.username);
    },
};
