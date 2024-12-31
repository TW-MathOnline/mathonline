import { UserRole } from "@prisma/client";
import z from "zod";
import { AuthPayload } from "../../../../__generated__/server/resolvers-types";
import { AuthFailedGraphQLError } from "../../../error/graphql/authFailedGraphQLError";
import { AuthError } from "../../../error/native/authError";
import { Logger } from "../../schema";
import { AuthCrud } from "./crud";
import { generateTokens, verifyRefreshToken } from "./utils/tokenGenerator";
import ldap from "ldapjs";
import { PrismaClient } from "@prisma/client";

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

    async authenticateUser(username: string, password: string) {
        return new Promise((resolve, reject) => {
            // LDAP server URL
            const ldapUrl = "ldap://ldap.technikum-wien.at";
            const client = ldap.createClient({
                url: ldapUrl,
            });

            // Bind with user's credentials
            const dn = `uid=${username},ou=people,dc=technikum-wien,dc=at`;
            client.bind(dn, password, (err) => {
                if (err) {
                    //console.error("LDAP bind failed:", err);
                    reject("Authentication failed");
                } else {
                    //console.log("LDAP bind successful");
                    resolve("Authentication successful");
                }

                // Unbind the client to close the connection
                client.unbind((unbindErr) => {
                    if (unbindErr) {
                        //console.error("Error unbinding:", unbindErr);
                    }
                });
            });
        });
    }

    async login(username: string, password: string): Promise<AuthPayload> {
        try {
            // Check if the user credentials are correct via ldap
            await this.authenticateUser(username, password);

            const prisma = new PrismaClient();

            const persistedUser = await prisma.user.findUnique({
                where: { username },
            });

            if (!persistedUser) {
                throw new AuthFailedGraphQLError(
                    `User ${username} is not authorized to log in.`,
                );
            }

            //console.log(persistedUser.role );

            // Generate tokens using the user's role from the database
            const { token, refreshToken } = generateTokens(
                username,
                persistedUser.role as UserRole, // Ensure role is of type UserRole
            );

            return { token, refreshToken };
        } catch (err) {
            //console.error(err);
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
