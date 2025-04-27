import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <h2 className={`sidebar-title ${isOpen ? "" : "hidden"}`}>Admin Panel</h2>
      <ul className="sidebar-menu">
        <li className="menu-item">
          <span className="menu-icon">📊</span>
          {isOpen && <Link to="/" className="menu-text">Dashboard</Link>}
        </li>
        <li className="menu-item">
          <span className="menu-icon">🛍️</span>
          {isOpen && <Link to="/products" className="menu-text">Products</Link>}
        </li>
        <li className="menu-item">
          <span className="menu-icon">📦</span>
          {isOpen && <Link to="/orders" className="menu-text">Orders</Link>}
        </li>
        <li className="menu-item">
          <span className="menu-icon">👤</span>
          {isOpen && <Link to="/users" className="menu-text">Users</Link>}
        </li>
      </ul>
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
    </div>
  );
};

export default Sidebar;