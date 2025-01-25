import React, { useState } from 'react';

const FdsRdsComponent = () => {
  const [showFdIframe, setShowFdIframe] = useState(false);
  const [showRdIframe, setShowRdIframe] = useState(false);

  const handleFdClick = () => {
    setShowFdIframe(true);
    setShowRdIframe(false);
  };

  const handleRdClick = () => {
    setShowRdIframe(true);
    setShowFdIframe(false);
  };

  return (
    <div>
      <div>
        <button onClick={handleFdClick} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-5 rounded my-5'>Fixed Deposit</button>
        <button onClick={handleRdClick} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-5 rounded my-5'>Recurring Deposit</button>
      </div>

      {showFdIframe && (
        <iframe
          src="http://localhost:8503" 
          title="FD Iframe"
          width="100%"
          height="500px"
        />
      )}

      {showRdIframe && (
        <iframe
          src="http://localhost:8504" 
          title="RD Iframe"
          width="100%"
          height="500px"
        />
      )}
    </div>
  );
};

export default FdsRdsComponent;