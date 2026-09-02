import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [username, setUsername] = useState("USERID");

useEffect(() => {
  fetch("http://localhost:3002/me", {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Logged in user:", data);
      setUsername(data.username);
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
    });
}, []);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3002/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      console.log(data.message);

      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">

      <img
        src="logo.png"
        style={{ width: "50px" }}
        alt="Logo"
      />

      <div className="menus">

        <ul>

          {/* Dashboard */}
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p
                className={
                  selectedMenu === 0
                    ? activeMenuClass
                    : menuClass
                }
              >
                Dashboard
              </p>
            </Link>
          </li>

          {/* Orders */}
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p
                className={
                  selectedMenu === 1
                    ? activeMenuClass
                    : menuClass
                }
              >
                Orders
              </p>
            </Link>
          </li>

          {/* Holdings */}
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p
                className={
                  selectedMenu === 2
                    ? activeMenuClass
                    : menuClass
                }
              >
                Holdings
              </p>
            </Link>
          </li>

          {/* Positions */}
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p
                className={
                  selectedMenu === 3
                    ? activeMenuClass
                    : menuClass
                }
              >
                Positions
              </p>
            </Link>
          </li>

          {/* Funds */}
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p
                className={
                  selectedMenu === 4
                    ? activeMenuClass
                    : menuClass
                }
              >
                Funds
              </p>
            </Link>
          </li>

          {/* Apps */}
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p
                className={
                  selectedMenu === 6
                    ? activeMenuClass
                    : menuClass
                }
              >
                Apps
              </p>
            </Link>
          </li>

        </ul>

        <hr />

        {/* Profile */}
        <div className="profile-container">

          <div
            className="profile"
            onClick={() =>
              setShowProfileMenu(!showProfileMenu)
            }
          >
            <div className="avatar">
              ZU
            </div>

            <p className="username">
              {username}
            </p>
          </div>

          {/* Logout dropdown */}
          {showProfileMenu && (
            <div className="profile-menu">

              <button onClick={handleLogout}>
                Logout
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Menu;