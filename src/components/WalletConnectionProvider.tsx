import WalletConnections from 'components/WalletConnections';
import { HandshakeContext } from 'hooks/useHandshake';
import React, { useState } from 'react';
import { SiweMessage } from 'siwe';

export const WalletConnectionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isSigningMessage, setIsSigningMessage] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [message, setMessage] = useState<SiweMessage | undefined>(undefined);

  return (
    <HandshakeContext.Provider
      value={{
        isSigningMessage,
        isSigningIn,
        isSigningOut,
        message,
        setIsSigningMessage,
        setIsSigningIn,
        setIsSigningOut,
        setMessage,
      }}
    >
      <div>
        <WalletConnections />
        {children}
      </div>
    </HandshakeContext.Provider>
  );
};
