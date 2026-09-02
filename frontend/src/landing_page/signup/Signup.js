import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!username || !email || !password) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3002/signup",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      setMessage(response.data.message || "Signup successful!");

      setUsername("");
      setEmail("");
      setPassword("");

      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);

      if (error.response) {
        setMessage(
          error.response.data.message || "Signup failed"
        );
      } else {
        setMessage("Backend not reachable");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">

      <div className="signup-container">

        <div className="signup-left">
          <h1>Open your Trade Account</h1>

          <p>
            Start investing and trading with our simple and
            powerful trading platform.
          </p>

          <div className="signup-features">
            <p>✓ Easy account setup</p>
            <p>✓ Secure authentication</p>
            <p>✓ Track your investments</p>
            <p>✓ Manage your portfolio</p>
          </div>
        </div>

        <div className="signup-card">

          <h2>Create your account</h2>

          <p className="signup-subtitle">
            Enter your details to get started
          </p>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Username</label>

              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {message && (
              <p className="signup-message">
                {message}
              </p>
            )}

            <button
              type="submit"
              className="signup-button"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          <p className="login-link">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;