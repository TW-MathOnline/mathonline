"use client";
import { USERS_QUERY } from "@/app/client/query/user/userQuery";
import { useSuspenseQuery } from "@apollo/client";
import styles from "./userlist.module.css";
import { UserRow } from "./userRow/userRow";

export function UserList() {
  const { data, error } = useSuspenseQuery(USERS_QUERY);
  if (error) return <p>Error loading users...</p>;

  return (
    <div>
      <div className={styles.headline}>
        <p>Username</p>
        <p>Role</p>
        <p>Action</p>
      </div>
      <div className={styles.list_container}>
        {data.users.map((user) => (
          <div key={user.username}>
            <UserRow user={user} />
          </div>
        ))}
      </div>
    </div>
  );
}
