import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import authService from "../../services/authService";
const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const token = authService.getToken();

    if (token) {
      navigate("/consulta-beneficios");
    } else {
      const authResponse = await authService.login({
        username: username,
        password: password,
      });

      //todo: colocar authResponse aqui
      if (!authResponse) {
        navigate("/consulta-beneficios");
      }
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleLogin}>
        <h1>Login</h1>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </label>
        <br />
        <button type="submit" className="button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
