import React, { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3002/me", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Authenticated user:", response.data.user);
        setAuthenticated(true);
      })
      .catch((error) => {
        console.error("Authentication failed:", error);
        setAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
        }}
      >
        Checking authentication...
      </div>
    );
  }

  if (!authenticated) {
    window.location.href = "http://localhost:3001/login";
    return null;
  }

  return children;
};

export default ProtectedRoute;