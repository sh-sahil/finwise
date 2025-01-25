import React from 'react';

const StocksComponent = () => {
  return (
    <div className="w-full h-screen">
        <button>
            Real-Time Stocks
        </button>
        <button>
            Historical Stocks
        </button>
      <iframe
        src="http://localhost:8503"
        title="Stocks Analysis"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        allowFullScreen
      />
    </div>
  );
};

export default StocksComponent;