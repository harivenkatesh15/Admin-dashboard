import React from "react";
import "./Sidebar.css";

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <h2 className={`sidebar-title ${isOpen ? "" : "hidden"}`}>Admin Panel</h2>
      <ul className="sidebar-menu">
        <li className="menu-item">
          <span className="menu-icon">📊</span>
          {isOpen && <span className="menu-text">Dashboard</span>}
        </li>
        <li className="menu-item">
          <span className="menu-icon">🛍️</span>
          {isOpen && <span className="menu-text">Products</span>}
        </li>
        <li className="menu-item">
          <span className="menu-icon">📦</span>
          {isOpen && <span className="menu-text">Orders</span>}
        </li>
        <li className="menu-item">
          <span className="menu-icon">👤</span>
          {isOpen && <span className="menu-text">Users</span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;