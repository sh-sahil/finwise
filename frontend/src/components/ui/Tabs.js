import React, { useState } from 'react';

export function Tabs({ children, defaultValue }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div>
      {React.Children.map(children, child => {
        if (child.type === TabsList) {
          return React.cloneElement(child, { 
            activeTab, 
            setActiveTab 
          });
        }
        return child;
      })}
      {React.Children.map(children, child => {
        if (child.type === TabsContent) {
          return React.cloneElement(child, { activeTab });
        }
        return null;
      })}
    </div>
  );
}

export function TabsList({ children, activeTab, setActiveTab, className = '' }) {
  return (
    <div className={`flex ${className}`}>
      {React.Children.map(children, child => 
        React.cloneElement(child, { 
          isActive: child.props.value === activeTab,
          onClick: () => setActiveTab(child.props.value)
        })
      )}
    </div>
  );
}

export function TabsTrigger({ children, value, isActive, onClick, className = '' }) {
  return (
    <button
      className={`px-4 py-2 ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200'} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, value, activeTab }) {
  return value === activeTab ? <>{children}</> : null;
}

export function Select({ children, onValueChange }) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (value) => {
    setSelectedValue(value);
    onValueChange(value);
  };

  return (
    <select 
      value={selectedValue}
      onChange={(e) => handleChange(e.target.value)}
      className="w-full px-3 py-2 border rounded-md"
    >
      <option value="">Select an option</option>
      {children}
    </select>
  );
}

export function SelectTrigger({ children }) {
  return <>{children}</>;
}

export function SelectValue({ placeholder }) {
  return <>{placeholder}</>;
}

export function SelectContent({ children }) {
  return <>{children}</>;
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}



