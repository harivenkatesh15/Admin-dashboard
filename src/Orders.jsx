
import { supabase } from "./CreateItem";
import React, { useState, useEffect } from "react";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const { data } = await supabase.from("orders").select("*");
    setOrders(data);
  }

  return (
    <div>
      <h1>Orders Page</h1>
      <table className="product-table">

        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Phone No</th>
            <th>Address</th>
            <th>Price</th>
            <th>Payment Methos</th>
            <th>Order Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.full_name}</td>
              <td>{order.phone_number}</td>
              <td>{order.address}</td>
              <td>{order.total_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;