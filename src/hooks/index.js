import { useContext } from 'react';
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
