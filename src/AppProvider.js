import React, { useState, useEffect } from 'react';
import { useAuth } from 'hooks';
import { AppContext } from 'contexts';
import { useLazyQuery } from '@apollo/client';
import { ME } from 'api/queries';

const AppProvider = ({ children }) => {
  const { accessToken } = useAuth();
  const [fetchCurrentUser, { data: currentUserData }] = useLazyQuery(ME);

  useEffect(() => {
    if (Boolean(accessToken)) {
      fetchCurrentUser();
    }
  }, [accessToken]);

  return (
    <AppContext.Provider
      value={{
        currentUser: currentUserData?.me,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
