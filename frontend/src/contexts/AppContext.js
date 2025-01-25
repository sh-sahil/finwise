import React, { createContext, useReducer, useContext } from 'react';

// Initial state
const initialState = {
  user: null,
  theme: 'light',
  features: []
};

// Action types
const SET_USER = 'SET_USER';
const TOGGLE_THEME = 'TOGGLE_THEME';
const SET_FEATURES = 'SET_FEATURES';

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case TOGGLE_THEME:
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    case SET_FEATURES:
      return { ...state, features: action.payload };
    default:
      return state;
  }
}

// Create context
const AppContext = createContext();

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook for using context
export function useAppContext() {
  return useContext(AppContext);
}