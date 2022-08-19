import React from 'react';

import { AuthContext, useAuth } from '../../hooks/useAuth';

const AuthorizationWrap = ({ children }) => {
  const { connectMetaMask, connectWalletConnect, logOut } = useAuth();

  return (
    <AuthContext.Provider value={{ connectMetaMask, connectWalletConnect, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthorizationWrap;
