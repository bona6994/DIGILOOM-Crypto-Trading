import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Admin() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get('/api/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const ordersRes = await axios.get('/api/orders', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUsers(usersRes.data);
        setOrders(ordersRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Admin Panel</h1>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.username} - {user.balance} INR</li>
        ))}
      </ul>
      <h2>Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order._id}>{order.type} - {order.amount} INR - {order.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;