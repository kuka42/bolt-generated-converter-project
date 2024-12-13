import React, { useState, useEffect } from 'react';

    function App() {
      const [plnAmount, setPlnAmount] = useState('');
      const [cryptoAmount, setCryptoAmount] = useState('');
      const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
      const [rate, setRate] = useState(null);
      const [error, setError] = useState(null);

      const cryptoOptions = [
        { value: 'bitcoin', label: 'BTC' },
        { value: 'ethereum', label: 'ETH' },
        { value: 'polkadot', label: 'POLKADOT' },
        { value: 'dogecoin', label: 'DOGE' },
      ];

      useEffect(() => {
        const fetchRate = async () => {
          try {
            const response = await fetch(
              `https://api.coingecko.com/api/v3/simple/price?ids=${selectedCrypto}&vs_currencies=pln`,
            );
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setRate(data[selectedCrypto].pln);
            setError(null);
          } catch (e) {
            setError('Failed to fetch exchange rate.');
            console.error('Error fetching exchange rate:', e);
          }
        };

        fetchRate();
      }, [selectedCrypto]);

      const handlePlnChange = (event) => {
        const value = event.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
          setPlnAmount(value);
          if (rate) {
            setCryptoAmount((value / rate).toFixed(8));
          } else {
            setCryptoAmount('');
          }
        }
      };

      const handleCryptoChange = (event) => {
        const value = event.target.value;
         if (/^\d*\.?\d*$/.test(value)) {
          setCryptoAmount(value);
          if (rate) {
            setPlnAmount((value * rate).toFixed(2));
          } else {
            setPlnAmount('');
          }
        }
      };

      const handleCryptoSelect = (event) => {
        setSelectedCrypto(event.target.value);
        setPlnAmount('');
        setCryptoAmount('');
      };

      return (
        <div className="converter-container">
          <h2>Currency Converter</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="input-group">
            <label>Select Cryptocurrency</label>
            <select value={selectedCrypto} onChange={handleCryptoSelect}>
              {cryptoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
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
            <label>{cryptoOptions.find(option => option.value === selectedCrypto).label}</label>
            <input
              type="text"
              value={cryptoAmount}
              onChange={handleCryptoChange}
              placeholder={`Enter ${cryptoOptions.find(option => option.value === selectedCrypto).label} amount`}
            />
          </div>
          {rate && (
            <div className="result">
              <p>
                1 {cryptoOptions.find(option => option.value === selectedCrypto).label} = {rate} PLN
              </p>
            </div>
          )}
        </div>
      );
    }

    export default App;
