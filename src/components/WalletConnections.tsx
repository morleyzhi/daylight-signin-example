import SignMessageModal from 'components/SignMessageModal';
import { useSession } from 'next-auth/react';
import { useConnect, useDisconnect } from 'wagmi';

import { useHandshake } from 'hooks/useHandshake';
import { useIsMounted } from 'hooks/useIsMounted';

const WalletConnections = () => {
  const { isSigningMessage, isSigningIn, requestSignature } = useHandshake();
  const { activeConnector } = useConnect();
  const { disconnect } = useDisconnect();
  const session = useSession();

  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {activeConnector && session.status === 'unauthenticated' && (
        <SignMessageModal
          isLoading={isSigningMessage || isSigningIn}
          onContinue={() => requestSignature()}
          onCancel={() => disconnect()}
        />
      )}
    </>
  );
};

export default WalletConnections;
