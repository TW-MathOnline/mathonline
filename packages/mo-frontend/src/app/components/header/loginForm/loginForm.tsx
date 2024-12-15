"use client";
import styles from "./loginForm.module.css";

export function LoginForm() {
  function handleLogin(formdata: FormData) {
    const username = formdata.get("username");
    const password = formdata.get("password");

    console.log("Username:", username, ", Password:", password);
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
