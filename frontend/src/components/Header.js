// Header.js
import React from "react";
import LoginSignupDialog from "./LoginSignupDialog";

const Header = () => {
  return (
    <header className="p-6 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/api/placeholder/50/50" alt="Logo" className="mr-3" />
        <h1 className="text-2xl font-bold text-blue-800">FinWise</h1>
      </div>
      <LoginSignupDialog />
    </header>
  );
};

export default Header;
