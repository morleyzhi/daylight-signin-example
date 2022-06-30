import React, { useState } from 'react';
import { SiweMessage } from 'siwe';
import { useSession } from 'next-auth/react';
import { useConnect } from 'wagmi';

import { HandshakeContext } from 'hooks/useHandshake';
import SignMessageModal from 'components/SignMessageModal';
import { useIsMounted } from 'hooks/useIsMounted';

export const WalletConnectionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isSigningMessage, setIsSigningMessage] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [message, setMessage] = useState<SiweMessage | undefined>(undefined);

  const { activeConnector } = useConnect();
  const session = useSession();
  const isMounted = useIsMounted();

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
        {isMounted &&
          activeConnector &&
          session.status === 'unauthenticated' && <SignMessageModal />}

        {children}
      </div>
    </HandshakeContext.Provider>
  );
};
