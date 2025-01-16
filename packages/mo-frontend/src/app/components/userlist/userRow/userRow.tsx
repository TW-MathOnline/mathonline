import { User, UserRole } from "@/__generated__/client/graphql";
import {
  DELETE_USER_MUTATION,
  UPDATE_USER_MUTATION,
} from "@/app/client/mutation/user/userMutation";
import { USERS_QUERY } from "@/app/client/query/user/userQuery";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import styles from "./userRow.module.css";

interface UserRowProps {
  user: User;
}

export function UserRow({ user }: Readonly<UserRowProps>) {
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    variables: { username: user.username },
    update(cache) {
      const existingUsers = cache.readQuery({ query: USERS_QUERY });
      if (existingUsers) {
        const updatedUsers = existingUsers.users.filter(
          (u: User) => u.username !== user.username
        );
        cache.writeQuery({
          query: USERS_QUERY,
          data: { users: updatedUsers },
        });
      }
    },
  });

  const [updateUser] = useMutation(UPDATE_USER_MUTATION);

  const handleRoleChange = () => {
    const newRole =
      user.role === UserRole.Basic ? UserRole.AdvancedUser : UserRole.Basic;
    updateUser({
      variables: { data: { username: user.username, role: newRole } },
      optimisticResponse: {
        updateUser: {
          __typename: "User",
          username: user.username,
          role: newRole,
        },
      },
      update(cache, { data }) {
        if (data) {
          const updatedUser = data.updateUser;
          const existingUsers = cache.readQuery({ query: USERS_QUERY });
          if (existingUsers) {
            const updatedUsers = existingUsers.users.map((u: User) =>
              u.username === updatedUser.username
                ? { ...u, role: updatedUser.role }
                : u
            );
            cache.writeQuery({
              query: USERS_QUERY,
              data: { users: updatedUsers },
            });
          }
        }
      },
    }).catch((err) => toast.error(`Error updating role: ${err.message}`));
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${user.username}?`)) {
      deleteUser().catch((err) =>
        toast.error(`Error deleting user: ${err.message}`)
      );
    }
  };

  return (
    <div className={styles.container}>
      <p>{user.username}</p>
      <p>
        {user.role} <button onClick={handleRoleChange}>Change</button>
      </p>
      <p>
        <button onClick={handleDelete}>Delete</button>
      </p>
    </div>
  );
}
