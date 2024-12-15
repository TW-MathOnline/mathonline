"use client";
import styles from "./header.module.css";
import { Profile } from "./profile/profile";

export function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.inner_header}>
        <h1>Mathonline</h1>
        <Profile />
      </div>
    </header>
  );
}
