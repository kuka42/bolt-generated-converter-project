import React, { useState, useEffect } from 'react';

    function App() {
      const [plnAmount, setPlnAmount] = useState('');
      const [btcAmount, setBtcAmount] = useState('');
      const [rate, setRate] = useState(null);
      const [error, setError] = useState(null);

      useEffect(() => {
        const fetchRate = async () => {
          try {
            const response = await fetch(
              'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=pln',
            );
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setRate(data.bitcoin.pln);
            setError(null);
          } catch (e) {
            setError('Failed to fetch exchange rate.');
            console.error('Error fetching exchange rate:', e);
          }
        };

        fetchRate();
      }, []);

      const handlePlnChange = (event) => {
        const value = event.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
          setPlnAmount(value);
          if (rate) {
            setBtcAmount((value / rate).toFixed(8));
          } else {
            setBtcAmount('');
          }
        }
      };

      const handleBtcChange = (event) => {
        const value = event.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
          setBtcAmount(value);
          if (rate) {
            setPlnAmount((value * rate).toFixed(2));
          } else {
            setPlnAmount('');
          }
        }
      };

      return (
        <div className="converter-container">
          <h2>Currency Converter</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="input-group">
            <label>PLN</label>
            <input
              type="text"
              value={plnAmount}
              onChange={handlePlnChange}
              placeholder="Enter PLN amount"
            />
          </div>
          <div className="input-group">
            <label>BTC</label>
            <input
              type="text"
              value={btcAmount}
              onChange={handleBtcChange}
              placeholder="Enter BTC amount"
            />
          </div>
          {rate && (
            <div className="result">
              <p>
                1 BTC = {rate} PLN
              </p>
            </div>
          )}
        </div>
      );
    }

    export default App;
