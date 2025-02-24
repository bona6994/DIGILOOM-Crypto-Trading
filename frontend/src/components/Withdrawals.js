import React, { useState } from 'react';
import axios from 'axios';

function Withdrawals() {
  const [withdrawal, setWithdrawal] = useState({
    bankName: '',
    ifscCode: '',
    accountNumber: '',
    accountHolderName: '',
    amount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWithdrawal(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/withdrawals', withdrawal, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Withdrawal request submitted');
      setWithdrawal({
        bankName: '',
        ifscCode: '',
        accountNumber: '',
        accountHolderName: '',
        amount: ''
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Withdraw Funds</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="bankName"
          placeholder="Bank Name"
          value={withdrawal.bankName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="ifscCode"
          placeholder="IFSC Code"
          value={withdrawal.ifscCode}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="accountNumber"
          placeholder="Account Number"
          value={withdrawal.accountNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="accountHolderName"
          placeholder="Account Holder Name"
          value={withdrawal.accountHolderName}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount in INR"
          value={withdrawal.amount}
          onChange={handleChange}
          required
        />
        <button type="submit">Request Withdrawal</button>
      </form>
    </div>
  );
}

export default Withdrawals;