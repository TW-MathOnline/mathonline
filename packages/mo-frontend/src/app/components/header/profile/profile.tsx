import { COOKIE_KEY_USER_TOKEN } from "@/app/utils/authUtils";
import useDecodedToken from "../../hooks/useJwt";

export function Profile() {
  const decodedUser = useDecodedToken(COOKIE_KEY_USER_TOKEN);
  return (
    <div>
      <span>Welcome back, {decodedUser?.username}</span>
    </div>
  );
}
