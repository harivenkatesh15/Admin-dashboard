import React, { useState ,useEffect} from "react";
import "./dashboard.css";
import { supabase } from "./CreateItem";
import { CgAddR } from "react-icons/cg";


const Dashboard = () => {



  const [products, setProducts] = useState([
    {
      product_id: '',
      name: " ",
      description: " ",
      price_0_5: "",
      price_6_25: "",
      price_26_50: "",
      price_51_100: "",
      price_100_above: "",
      image: ""
    }
  ]);
  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      console.error("Error fetching products:", error);
    } else {
      console.log("Fetched products:", data);
      setProducts(data);
    }
  }

  const stats = [
    { title: "Total Users", value: 277, icon: "👤", color: "green" },
    { title: "Total Orders", value: 77, icon: "🛒", color: "pink" },
  ];

  const handleEdit = (id) => {
    alert(`Edit product with ID: ${id}`);
  };

  const handleDelete = async (id) => {
    console.log("Deleting product with ID:", id);
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("product_id", id);
  
    if (error) {
      console.error("Error deleting product:", error);
    } else {
      fetchItems(); 
    }
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

     </div>
  );
};

export default Dashboard;

