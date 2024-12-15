import { UserRole } from "@prisma/client";
import jwt from "jsonwebtoken";
import { AuthError } from "../../../../error/native/authError";
import { safeEnv } from "../../../../utils/utils";

const SECRET_KEY = safeEnv("MO_SECRET_KEY");
const REFRESH_SECRET_KEY = safeEnv("MO_REFRESH_SECRET_KEY");

export function generateTokens(username: string, role: UserRole) {
    const token = jwt.sign(
        {
            username,
            role,
        },
        SECRET_KEY,
        { expiresIn: "2h" },
    );

    const refreshToken = jwt.sign(
        {
            username,
        },
        REFRESH_SECRET_KEY,
        { expiresIn: "7d" },
    );

    return { token, refreshToken };
}

export function verifyRefreshToken(refreshToken: string) {
    try {
        return jwt.verify(refreshToken, REFRESH_SECRET_KEY);
    } catch (err) {
        throw new AuthError("Invalid or expired refresh token");
    }
}

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        throw new AuthError("Invalid or expired token");
    }
}
