import React, { useState } from 'react';

const StocksComponent = () => {
  const [showRealTime, setShowRealTime] = useState(true);
  const [showHistorical, setShowHistorical] = useState(false);

  return (
    <div className="w-full h-screen">
      <button onClick={() => {
          setShowRealTime(!showRealTime);
          setShowHistorical(false);
        }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-10 rounded my-5'>
        Real-Time Stocks
      </button>
      <button  onClick={() => {
          setShowHistorical(!showHistorical);
          setShowRealTime(false);
        }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-10 rounded my-5'>
        Historical Stocks
      </button>

      {showRealTime && (
        <iframe
          src="http://localhost:8501"
          title="Stocks Real-Time Analysis"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          allowFullScreen
        />
      )}

      {showHistorical && (
        <iframe
          src="http://localhost:8502"
          title="Stocks Historical Analysis"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          allowFullScreen
        />
      )}
    </div>
  );
};

export default StocksComponent;