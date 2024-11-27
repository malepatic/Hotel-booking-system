import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Order Management</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            {order.user} - {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderManagement;