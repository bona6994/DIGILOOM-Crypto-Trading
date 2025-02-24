import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderBook() {
  const [orders, setOrders] = useState([]);
  const [type, setType] = useState('Buy');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/orders', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/orders', { type, amount }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setAmount('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Order Book</h1>
      <form onSubmit={handleSubmit}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Buy">Buy</option>
          <option value="Sell">Sell</option>
        </select>
        <input
          type="number"
          placeholder="Amount in INR"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Place Order</button>
      </form>
      <ul>
        {orders.map(order => (
          <li key={order._id}>{order.type} - {order.amount} INR - {order.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default OrderBook;