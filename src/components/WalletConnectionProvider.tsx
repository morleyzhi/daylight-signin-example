import WalletConnections from 'components/WalletConnections';
import { HandshakeContext } from 'hooks/useHandshake';
import React, { useState } from 'react';

export const WalletConnectionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isSigningMessage, setIsSigningMessage] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  return (
    <HandshakeContext.Provider
      value={{
        isSigningMessage,
        isSigningIn,
        isSigningOut,
        setIsSigningMessage,
        setIsSigningIn,
        setIsSigningOut,
      }}
    >
      <div>
        <WalletConnections />
        {children}
      </div>
    </HandshakeContext.Provider>
  );
};
