import React, { useEffect, useState } from "react";
import { GOLD } from "./config";

const GoldComponent = () => {
  const [data, setData] = useState(null); // State to store API data
  const [error, setError] = useState(null); // State to store errors

  useEffect(() => {
    // Function to fetch metal price data
    const fetchGoldData = async () => {
      const BASE_URL = "https://api.metalpriceapi.com/v1/latest";
      const params = new URLSearchParams({
        api_key: GOLD,
        base: "INR",
        currencies: "XAU,XAG",
      });

      try {
        const response = await fetch(`${BASE_URL}?${params.toString()}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const jsonData = await response.json();
        setData(jsonData); // Update state with fetched data
      } catch (err) {
        setError(err.message); // Update state with error message
      }
    };

    fetchGoldData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Metal Prices Dashboard</h1>
      {error ? (
        <div className="text-red-500 text-lg">{error}</div>
      ) : !data ? (
        <div className="text-gray-400 text-lg">Loading...</div>
      ) : (
        <div className="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Rates (Base: INR)</h2>
          <div className="flex justify-between mb-2"></div>
          <div className="flex justify-between mb-2">
            <span>Gold (XAU):</span>
            <span>{data.rates.INRXAU.toFixed(10)} INR</span>
          </div>
          <div className="flex justify-between">
            <span>Silver (XAG):</span>
            <span>{data.rates.INRXAG.toFixed(10)} INR</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoldComponent;
