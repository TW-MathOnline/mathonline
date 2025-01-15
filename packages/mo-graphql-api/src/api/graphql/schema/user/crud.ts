import {
    UpdateUserInput,
    User,
} from "../../../../__generated__/server/resolvers-types";
import { prisma } from "../../datasource/database/prismaClient";

export function fetchUsers() {
    return prisma.user.findMany({});
}

export function updateUser(user: UpdateUserInput): Promise<User> {
    return prisma.user.update({
        where: {
            username: user.username,
        },
        data: {
            ...user,
        },
    });
}

export function deleteUser(username: string): Promise<User> {
    return prisma.user.delete({
        where: {
            username,
        },
    });
}
