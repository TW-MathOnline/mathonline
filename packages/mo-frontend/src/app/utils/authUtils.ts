import { AuthPayload, Maybe } from "@/__generated__/client/graphql";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const COOKIE_KEY_USER_REFRESH_TOKEN = "mathonline_user_refresh_token";
export const COOKIE_KEY_USER_TOKEN = "mathonline_user_token";

export function isTokenExpiredOrNull(token: Maybe<string> | undefined) {
  if (!token) {
    return true;
  }

  try {
    const { exp } = jwtDecode(token);
    if (exp) {
      if (!(exp * 1000 < Date.now())) {
        return false;
      }
    }
  } catch (err) {
    console.error(`Auth failed. ${err}`);
  }

  return true;
}

export function setAuthCookies(authPayload: AuthPayload) {
  const { token, refreshToken } = authPayload;
  Cookies.set(COOKIE_KEY_USER_TOKEN, token);
  Cookies.set(COOKIE_KEY_USER_REFRESH_TOKEN, refreshToken);
}

export function rmAuthCookies() {
  Cookies.remove(COOKIE_KEY_USER_TOKEN);
  Cookies.remove(COOKIE_KEY_USER_REFRESH_TOKEN);
}
