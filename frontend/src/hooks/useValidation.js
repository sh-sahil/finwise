import { useState } from 'react';

export function useValidation(initialState, validationRules) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    
    // Validate individual field
    if (validationRules[name]) {
      const error = validationRules[name](value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(validationRules).forEach(key => {
      const error = validationRules[key](values[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    values,
    errors,
    handleChange,
    validateForm
  };
}

// Example usage
const validationRules = {
  email: (value) => 
    !value ? 'Email is required' : 
    !/\S+@\S+\.\S+/.test(value) ? 'Email is invalid' : null,
  password: (value) => 
    !value ? 'Password is required' : 
    value.length < 8 ? 'Password must be at least 8 characters' : null
};