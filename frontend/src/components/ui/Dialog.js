import React, { useState } from 'react';

export function Dialog({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {React.Children.map(children, child => 
        React.cloneElement(child, { 
          onClick: () => setIsOpen(!isOpen) 
        })
      )}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            {children}
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export function DialogTrigger({ children, ...props }) {
  return <>{children}</>;
}

export function DialogContent({ children }) {
  return <>{children}</>;
}
