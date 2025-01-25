import React from 'react';
import { Menu, X } from 'lucide-react'; // Assuming we're using Lucide icons

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { label: 'Home', href: '#' },
    { label: 'Features', href: '#features' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 to-blue-600 text-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <img 
            src="/logo.png" 
            alt="Company Logo" 
            className="w-12 h-12 rounded-full object-cover"
          />
          <h1 className="text-2xl font-bold tracking-tight">Your App Name</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {menuItems.map((item) => (
            <a 
              key={item.label}
              href={item.href}
              className="hover:text-blue-200 transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-blue-800 md:hidden">
            <nav className="flex flex-col items-center py-4 space-y-4">
              {menuItems.map((item) => (
                <a 
                  key={item.label}
                  href={item.href}
                  className="hover:text-blue-200 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;