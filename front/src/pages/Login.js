import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {      
      console.log("trying to login:  ", `${API_URL}/auth/login`);
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      
      if (res.ok) {
        const data = await res.json();         
        console.log("chen1");
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", username);
          navigate("/about");
        } else {
          setError(data.error || "Login token failed"); 
        }
      } else {
        setError( "Login failed");
      }
    } catch (err) {
      console.error("chen", err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className= "container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <div className="button-row">
          <button type="submit" className="button">Login</button>
          <button
            type="button"
            className="button secondary"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
