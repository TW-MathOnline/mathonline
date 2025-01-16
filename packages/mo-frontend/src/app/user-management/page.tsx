"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserList } from "../components/userlist/userlist";
import styles from "./page.module.css";
export default function Home() {
  return (
    <div className={styles.page}>
      <ToastContainer />
      <h1>User Managment</h1>
      <UserList />
    </div>
  );
}
