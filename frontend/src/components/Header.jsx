import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaBicycle,
  FaPlus,
  FaCog,
  FaInfoCircle,
  FaUser,
} from "react-icons/fa";
import "./Header.css";

function Header({ user, showUserMenu, setShowUserMenu, onLogout }) {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/">
              <FaHome className="nav-icon" />
              Home
            </Link>
          </li>
          <li>
            <Link to="/cycles">
              <FaBicycle className="nav-icon" />
              Cycle
            </Link>
          </li>
          <li>
            <Link
              to="#addcycle"
              onClick={() => {
                const el = document.querySelector(".add-cycle-form");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <FaPlus className="nav-icon" />
              Add Cycle
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <FaCog className="nav-icon" />
              Setting
            </Link>
          </li>
          <li>
            <Link to="/about">
              <FaInfoCircle className="nav-icon" />
              About
            </Link>
          </li>
        </ul>
      </nav>
      {user && (
        <div className="user-menu-container">
          <span
            className="user-name"
            onClick={() => setShowUserMenu((prev) => !prev)}
            tabIndex={0}
            style={{ cursor: "pointer" }}
          >
            <FaUser className="user-icon" />
            {user.email.split("@")[0]}
          </span>
          {showUserMenu && (
            <div className="user-menu-dropdown">
              <button className="user-menu-btn" onClick={onLogout}>
                Logout
              </button>
              <Link
                to="/settings"
                className="user-menu-btn"
                onClick={() => setShowUserMenu(false)}
              >
                Settings
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
