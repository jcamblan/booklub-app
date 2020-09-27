import React, { useState, useEffect } from 'react';
import { AuthContext } from 'contexts';
import AsyncStorage from '@react-native-community/async-storage';

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();

  const handleUpdate = async ({ accessToken, refreshToken }) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
  };

  const handleReset = async () => {
    setAccessToken('');
    setRefreshToken('');
    await AsyncStorage.setItem('accessToken', '');
    await AsyncStorage.setItem('refreshToken', '');
  };

  const getAndSetAccessToken = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    setAccessToken(accessToken);
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    setRefreshToken(refreshToken);
  };

  useEffect(() => {
    getAndSetAccessToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        onReset: handleReset,
        onUpdate: handleUpdate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
