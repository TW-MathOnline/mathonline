import { NextRequest, NextResponse } from "next/server";
import { makeClient } from "./app/client/apolloClient";
import { REFRESH_TOKEN_MUTATION } from "./app/client/mutation/auth/refreshToken";
import { logger } from "./app/config/logger";
import {
  COOKIE_KEY_USER_REFRESH_TOKEN,
  COOKIE_KEY_USER_TOKEN,
  isTokenExpiredOrNull,
} from "./app/utils/authUtils";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname !== "/login" && !pathname.startsWith("/_next")) {
    const isAuthenticated = await isUserAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

async function isUserAuthenticated(request: NextRequest): Promise<boolean> {
  const refreshToken = request.cookies.get(
    COOKIE_KEY_USER_REFRESH_TOKEN
  )?.value;

  const token = request.cookies.get(COOKIE_KEY_USER_TOKEN)?.value;

  if (isTokenExpiredOrNull(token)) {
    if (!isTokenExpiredOrNull(refreshToken)) {
      try {
        const refreshTokens = await makeClient().mutate({
          mutation: REFRESH_TOKEN_MUTATION,
          variables: {
            refreshToken: refreshToken as string,
          },
        });

        if (!refreshTokens.errors && refreshTokens.data) {
          const { refreshToken, token } = refreshTokens.data.refreshToken;

          request.cookies.set(COOKIE_KEY_USER_TOKEN, token);
          request.cookies.set(COOKIE_KEY_USER_REFRESH_TOKEN, refreshToken);
          return true;
        }
      } catch (err) {
        logger.info(`Auth failed. ${err}`);
      }
    }
  }
  request.cookies.delete(COOKIE_KEY_USER_TOKEN);
  request.cookies.delete(COOKIE_KEY_USER_REFRESH_TOKEN);
  return false;
}
