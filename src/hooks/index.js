import React, { useState, useEffect, useContext } from 'react';
import { AuthContext, AppContext } from 'contexts';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }

  return context;
};

export const useApp = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error(`useAuth must be used within a AppProvider`);
  }

  return context;
};

export const useDebounce = (value, timeout) => {
  const [state, setState] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setState(value), timeout);
    return () => clearTimeout(handler);
  }, [value, timeout]);
  return state;
};
