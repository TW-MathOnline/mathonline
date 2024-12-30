"use client";
import { LOGIN_MUTATION } from "@/app/client/mutation/auth/login";
import styles from "./loginForm.module.css";
import { makeClient } from "@/app/client/apolloClient";
import { setAuthCookies } from "@/app/utils/authUtils";
import { AuthPayload } from "@/__generated__/client/graphql";
import { useState } from "react";

export function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleLogin(formdata: FormData) {
    setErrorMessage(null); // Reset error message on new login attempt

    try {
      const tokens = await makeClient().mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          username: formdata.get("username") as string,
          password: formdata.get("password") as string,
        },
      });

      if (!tokens.data?.login) {
        throw new Error("Invalid response from server");
      }

      setAuthCookies({
        token: tokens.data.login.token,
        refreshToken: tokens.data.login.refreshToken,
      } as AuthPayload);

      // Optionally, redirect to another page after successful login
      // e.g., window.location.href = "/dashboard";
    } catch (err) {
      setErrorMessage("Authentication failed. Please check your credentials.");
      console.error("Login error:", err);
    }
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault(); // Prevent default form submission
        const formdata = new FormData(e.target as HTMLFormElement);
        handleLogin(formdata);
      }}
    >
      <h1 className={styles.h1}>Login</h1>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <input
        type="text"
        name="username"
        className={styles.inputField}
        placeholder="Email or Username"
      />
      <br />
      <input
        type="password"
        name="password"
        className={styles.inputField}
        placeholder="Password"
      />
      <br />
      <button type="submit" className={styles.button}>
        Login
      </button>
    </form>
  );
}