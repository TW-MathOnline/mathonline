import { User } from "../../../../__generated__/server/resolvers-types";
import { Logger } from "../../schema";

export class AuthCrud {
    logger: Logger;
    constructor(logger: Logger) {
        this.logger = logger;
    }

    async findByUsername(username: string): Promise<User> {
        return prisma.user.findUnique({
            where: {
                username,
            },
        });
    }
}
