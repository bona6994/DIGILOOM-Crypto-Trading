import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [newReferralCode, setNewReferralCode] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get('/api/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const ordersRes = await axios.get('/api/orders', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const withdrawalsRes = await axios.get('/api/withdrawals', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUsers(usersRes.data);
        setOrders(ordersRes.data);
        setWithdrawals(withdrawalsRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleApproveOrder = async (orderId) => {
    try {
      await axios.put(`/api/admin/orders/approve/${orderId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setOrders(orders.map(order => order._id === orderId ? { ...order, status: 'Approved' } : order));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRejectOrder = async (orderId) => {
    const reason = prompt('Enter reason for rejection:');
    if (reason) {
      try {
        await axios.put(`/api/admin/orders/reject/${orderId}`, { reason }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setOrders(orders.map(order => order._id === orderId ? { ...order, status: 'Rejected', rejectReason: reason } : order));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCreateReferralCode = async () => {
    try {
      await axios.post('/api/admin/referral-codes', { code: newReferralCode }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNewReferralCode('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleApproveWithdrawal = async (withdrawalId) => {
    try {
      await axios.put(`/api/admin/withdrawals/approve/${withdrawalId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setWithdrawals(withdrawals.map(withdrawal => withdrawal._id === withdrawalId ? { ...withdrawal, status: 'Approved' } : withdrawal));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRejectWithdrawal = async (withdrawalId) => {
    const reason = prompt('Enter reason for rejection:');
    if (reason) {
      try {
        await axios.put(`/api/admin/withdrawals/reject/${withdrawalId}`, { reason }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setWithdrawals(withdrawals.map(withdrawal => withdrawal._id === withdrawalId ? { ...withdrawal, status: 'Rejected', rejectReason: reason } : withdrawal));
      } catch (err) {
        console.error(err);
      }
    }
  };

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
          <li key={order._id}>
            {order.type} - {order.amount} INR - {order.status}
            {order.status === 'Pending' && (
              <>
                <button onClick={() => handleApproveOrder(order._id)}>Approve</button>
                <button onClick={() => handleRejectOrder(order._id)}>Reject</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <h2>Create Referral Code</h2>
      <input
        type="text"
        value={newReferralCode}
        onChange={(e) => setNewReferralCode(e.target.value)}
        placeholder="New referral code"
      />
      <button onClick={handleCreateReferralCode}>Create</button>
      <h2>Withdrawals</h2>
      <ul>
        {withdrawals.map(withdrawal => (
          <li key={withdrawal._id}>
            {withdrawal.amount} INR - {withdrawal.status}
            {withdrawal.status === 'Pending' && (
              <>
                <button onClick={() => handleApproveWithdrawal(withdrawal._id)}>Approve</button>
                <button onClick={() => handleRejectWithdrawal(withdrawal._id)}>Reject</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;