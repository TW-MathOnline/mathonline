import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { User } from "@/__generated__/client/graphql";

const useDecodedToken = (cookieName:string) => {
  const [decodedToken, setDecodedToken] = useState<User|null>(null);

  useEffect(() => {
    const token = Cookies.get(cookieName);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded as User);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [cookieName]);

  return decodedToken;
};

export default useDecodedToken;