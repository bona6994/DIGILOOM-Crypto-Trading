import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserPanel() {
  const [user, setUser] = useState({});
  const [withdrawal, setWithdrawal] = useState({
    bankName: '',
    ifscCode: '',
    accountNumber: '',
    accountHolderName: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/users/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const handleWithdrawalChange = (e) => {
    const { name, value } = e.target;
    setWithdrawal(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWithdrawalSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/withdrawals', withdrawal, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Withdrawal request submitted');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>User Panel</h1>
      <h2>Balance: {user.balance} INR</h2>
      <form onSubmit={handleWithdrawalSubmit}>
        <input
          type="text"
          name="bankName"
          placeholder="Bank Name"
          value={withdrawal.bankName}
          onChange={handleWithdrawalChange}
        />
        <input
          type="text"
          name="ifscCode"
          placeholder="IFSC Code"
          value={withdrawal.ifscCode}
          onChange={handleWithdrawalChange}
        />
        <input
          type="text"
          name="accountNumber"
          placeholder="Account Number"
          value={withdrawal.accountNumber}
          onChange={handleWithdrawalChange}
        />
        <input
          type="text"
          name="accountHolderName"
         