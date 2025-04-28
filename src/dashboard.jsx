import React, { useState ,useEffect} from "react";
import "./dashboard.css";
import { supabase } from "./CreateItem";
import { CgAddR } from "react-icons/cg";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const dummyData = [
  { month: "Jan", value: 40 },
  { month: "Feb", value: 30 },
  { month: "Mar", value: 20 },
  { month: "Apr", value: 27 },
  { month: "May", value: 18 },
  { month: "Jun", value: 23 },
  { month: "Jul", value: 34 },
  { month: "Aug", value: 44 },
  { month: "Sep", value: 39 },
  { month: "Oct", value: 50 },
  { month: "Nov", value: 45 },
  { month: "Dec", value: 60 },
];

const Dashboard = () => {


  const stats = [
    { title: "Total Users", value: 277, icon: "👤", color: "green" },
    { title: "Total Orders", value: 77, icon: "🛒", color: "pink" },
  ];




  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* Dynamic Stats Section */}
      <div className="stat-cards">
        {stats.map((stat, index) => (
          <div key={index} className={`card ${stat.color}`}>
            <div className="card-content">
              <h4>{stat.title}</h4>
              <h2>{stat.value}</h2>
              <p>Last Month</p>
            </div>
            <div className="icon">{stat.icon}</div>
          </div>
        ))}
      </div>
      <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart
          data={dummyData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>

     </div>
  );
};

export default Dashboard;

