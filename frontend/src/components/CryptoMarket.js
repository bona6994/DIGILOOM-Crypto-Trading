import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CryptoMarket() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await axios.get('/api/prices', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setPrices(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPrices();
  }, []);

  return (
    <div>
      <h1>Crypto Market</h1>
      <ul>
        {prices.map(price => (
          <li key={price._id}>{price.pair} - {price.price} INR</li>
        ))}
      </ul>
    </div>
  );
}

export default CryptoMarket;