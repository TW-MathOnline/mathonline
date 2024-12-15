import { UserRole } from "@prisma/client";
import z from "zod";
import { AuthPayload } from "../../../../__generated__/server/resolvers-types";
import { AuthFailedGraphQLError } from "../../../error/graphql/authFailedGraphQLError";
import { AuthError } from "../../../error/native/authError";
import { Logger } from "../../schema";
import { AuthCrud } from "./crud";
import { generateTokens, verifyRefreshToken } from "./utils/tokenGenerator";

const refreshTokenSchema = z.object({
    username: z.string(),
    iat: z.number(),
    exp: z.number(),
});

const userTokenScheme = z.object({
    username: z.string(),
    role: z.nativeEnum(UserRole),
    iat: z.number(),
    exp: z.number(),
});

export class AuthService {
    logger: Logger;
    crud: AuthCrud;
    constructor(logger: Logger) {
        this.logger = logger;
        this.crud = new AuthCrud(logger);
    }

    async login(username: string, password: string): Promise<AuthPayload> {
        try {
            // TO-DO:  CHECK via ldap if given user input is valid if yes then create tokens

            const persistedUser = await prisma.user.findUnique({
                where: { username },
            });

            const { token, refreshToken } = generateTokens(
                username,
                persistedUser.role,
            );

            return { token, refreshToken };
        } catch (err) {
            throw new AuthFailedGraphQLError(`Auth failed for ${username}`);
        }
    }

    async refreshToken(refreshToken: string): Promise<AuthPayload> {
        try {
            const decodedToken = refreshTokenSchema.safeParse(
                verifyRefreshToken(refreshToken),
            );
            if (!decodedToken.success) {
                this.logger.info(
                    `token=${refreshToken} has invalid structure.`,
                );
                throw new Error("Invalid token structure");
            }

            const foundUser = await prisma.user.findUnique({
                where: { username: decodedToken.data.username },
            });

            return generateTokens(foundUser.username, foundUser.role);
        } catch (err) {
            if (err instanceof AuthError) {
                this.logger.info(
                    `Refresh Token=${refreshToken} already expired.`,
                );
                throw new AuthFailedGraphQLError("Please log in again");
            }
            throw err;
        }
    }
}
