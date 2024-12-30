"use client";
import { LOGIN_MUTATION } from "@/app/client/mutation/auth/login";
import styles from "./loginForm.module.css";
import { gql, useMutation } from '@apollo/client';
import { makeClient } from "@/app/client/apolloClient";

export function LoginForm() {
  async function handleLogin(formdata: FormData) {

    const tokens = await makeClient().mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        username: formdata.get("username") as string,
        password: formdata.get("password") as string,
      },
    });

    console.log(tokens.data?.login.token);

  }

  return (
    <form className={styles.form} action={handleLogin}>
      <h1 className={styles.h1}>Login</h1>
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
