import React, { useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Dashboard from "./dashboard";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-container">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`main-content ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <Dashboard />
      </div>
    </div>
  );
};

export default App;
