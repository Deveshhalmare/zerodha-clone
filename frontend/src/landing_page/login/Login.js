import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setIsError(false);

    if (!email || !password) {
      setIsError(true);
      setMessage("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3002/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Login response:", response.data);

      setMessage("Login successful!");

      setTimeout(() => {
        window.location.href = "http://localhost:3000";
      }, 500);

    } catch (error) {
      console.error("Login error:", error);

      setIsError(true);

      if (error.response) {
        setMessage(
          error.response.data.message ||
          "Invalid email or password"
        );
      } else {
        setMessage("Backend not reachable");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-wrapper">

        {/* Left information section */}
        <div className="login-info">

          <div className="brand">
            <div className="brand-icon">Z</div>
            <span>ZERODHA</span>
          </div>

          <h1>
            Welcome <span>Back</span>
          </h1>

          <p className="info-description">
            Login to access your portfolio, track your
            investments and manage your trades.
          </p>

          <div className="login-features">

            <div className="feature">
              <span>✓</span>
              <p>Manage your portfolio</p>
            </div>

            <div className="feature">
              <span>✓</span>
              <p>Track your holdings</p>
            </div>

            <div className="feature">
              <span>✓</span>
              <p>Place buy and sell orders</p>
            </div>

            <div className="feature">
              <span>✓</span>
              <p>Monitor your investments</p>
            </div>

          </div>

        </div>

        {/* Login card */}
        <div className="login-card">

          <div className="login-card-header">

            <h2>Login</h2>

            <p>
              Enter your account details to continue
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label htmlFor="email">
                Email address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />

            </div>

            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />

            </div>

            {message && (
              <div
                className={`login-message ${
                  isError ? "error" : "success"
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <div className="login-divider">
            <span>OR</span>
          </div>

          <p className="signup-link">
            Don't have an account?
            <Link to="/signup">
              Create an account
            </Link>
          </p>

        </div>

      </div>

      <div className="login-footer">
        <p>
          © 2026 Zerodha Clone · Built for educational purposes
        </p>
      </div>

    </div>
  );
}

export default Login;