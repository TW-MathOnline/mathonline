import {
    AuthPayload,
    MutationLoginArgs,
    MutationRefreshTokenArgs,
} from "../../../../__generated__/server/resolvers-types";
import { ExtendedBaseContext } from "../../schema";
import { AuthService } from "./service";

export const authMutation = {
    login: async (
        parent: unknown,
        args: MutationLoginArgs,
        { logger }: ExtendedBaseContext,
    ): Promise<AuthPayload> => {
        logger.trace({ username: args.username }, "login mutation");

        const service = new AuthService(logger);
        return service.login(args.username, args.password);
    },
    refreshToken: async (
        parent: unknown,
        args: MutationRefreshTokenArgs,
        { logger }: ExtendedBaseContext,
    ): Promise<AuthPayload> => {
        logger.trace({ args }, "refreshToken mutation");

        const service = new AuthService(logger);
        return service.refreshToken(args.refreshToken);
    },
};
