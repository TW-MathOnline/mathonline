import { PrismaClient, UserRole } from "@prisma/client";
import { safeEnv } from "../../../utils/utils";

const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany({});
    await prisma.user.create({
        data: {
            username: safeEnv("MO_DEV_USER_USERNAME"),
            email: "devuser@gmail.com",
            role: UserRole.ADVANCED_USER,
        },
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
