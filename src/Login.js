import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const {state} = location;

  const handleLogin = () => {
    const user = {
      username: username,
      password: password,
    };
    const postUserData = async (url = "", data = {}) => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    };
    postUserData("http://localhost:8080/login", user)
      .then((data) => {
        
        navigate("/StudentHome");
        console.log("Success:", data);
      })
      .catch((error) => {
        setErrorMessage("Incorrect login information"); // Set error message if login fails
        console.error("Error:", error);
      });
  };

  const handleCreateAccount = () => {
    
    navigate("/signup");
  };

  return (
    <div className="App container">
      <h2>Tutor App</h2>
      {state && state.successMessage && (
        <div className="successMessage">{state.successMessage} </div>
      )}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}  
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleCreateAccount}>Create Account</button>
    </div>
  );
};

export default Login;
