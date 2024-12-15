// login.tsx
import React, { useState } from "react";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // password validation

    // go to dashboard
    window.location.href = "/dashboard";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Email or Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ margin: "10px", padding: "10px", width: "300px" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: "10px", padding: "10px", width: "300px" }}
      />
      <button
        onClick={handleLogin}
        style={{ margin: "10px", padding: "10px 20px", cursor: "pointer" }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
