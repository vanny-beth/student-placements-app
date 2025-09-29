// src/pages/Login.jsx
import { useState } from "react";
import axiosInstance from "../../../backend/src/utils/axiosInstance";
import { setTokens, setUser } from "../../../backend/src/utils/tokenStorage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axiosInstance.post("/auth/login/", {
        email,
        password,
      });

      const { access, refresh, user } = response.data;

      setTokens(access, refresh);
      setUser(user);

      // You could redirect based on role
      if (user.is_partner) {
        navigate("/partner-dashboard");
      } else if (user.is_trainee) {
        navigate("/trainee-dashboard");
      } else if (user.is_admin) {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
