import React, { useState } from "react";
import "./dashboard.css";
import { supabase } from "./CreateItem";


const Dashboard = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Tops and Skirt Set",
      description: "A stylish top and skirt set for women.",
      price_0_5: 500,
      price_6_25: 1000,
      price_25_50: 2500,
      price_51_100: 5000,
      price_100_above: 10000,
      image: "https://via.placeholder.com/48",
    },
    {
      id: 2,
      name: "Men's Jacket",
      description: "A warm and comfortable jacket for men.",
      price_0_5: 600,
      price_6_25: 1500,
      price_25_50: 3000,
      price_51_100: 6000,
      price_100_above: 12000,
      image: "https://via.placeholder.com/48",
    },
    {
      id: 3,
      name: "Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation.",
      price_0_5: 800,
      price_6_25: 2000,
      price_25_50: 4000,
      price_51_100: 8000,
      price_100_above: 15000,
      image: "https://via.placeholder.com/48",
    },
  ]);

  const stats = [
    { title: "Total Users", value: 277, icon: "👤", color: "green" },
    { title: "Total Orders", value: 77, icon: "🛒", color: "pink" },
  ];

  const handleEdit = (id) => {
    alert(`Edit product with ID: ${id}`);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleView = (id) => {
    alert(`View product with ID: ${id}`);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  };

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

      {/* Product Listing Section */}
      <h2 className="section-title">Product Listing</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>id</th>
            <th>Title</th>
            <th>description</th>
            <th>price_0_5</th>
            <th>price_6_25</th>
            <th>price_25_50</th>
            <th>price_51_100</th>
            <th>price_100_above</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <div className="product-title">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-img"
                  />
                  {product.name}
                </div>
              </td>
              <td>{product.description}</td>
              <td>{formatCurrency(product.price_0_5)}</td>
              <td>{formatCurrency(product.price_6_25)}</td>
              <td>{formatCurrency(product.price_25_50)}</td>
              <td>{formatCurrency(product.price_51_100)}</td>
              <td>{formatCurrency(product.price_100_above)}</td>
              <td>
                <div className="action-icons">
                  <button onClick={() => handleEdit(product.id)} className="edit-btn">
                    ✏️
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="delete-btn">
                    🗑️
                  </button>
                  <button onClick={() => handleView(product.id)} className="view-btn">
                    👁️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

