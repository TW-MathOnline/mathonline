import { PrismaClient, UserRole } from "@prisma/client";
import { safeEnv } from "../../../utils/utils";

const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany({});
    await prisma.user.createMany({
        data: [
            {
                username: safeEnv("MO_DEV_USER_USERNAME"),
                email: "devuser@gmail.com",
                role: UserRole.ADVANCED_USER,
            },
            {
                username: "Prof. XXX",
                email: "xxx@gmail.com",
                role: UserRole.ADVANCED_USER,
            },
            {
                username: "Basic Smiski",
                email: "basic@gmail.com",
                role: UserRole.BASIC,
            },
        ],
    });
}
main()
    .then(async () => {
        console.log("Seeding database...");
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
