import { wallet } from '@rainbow-me/rainbowkit';
import { isMobile } from 'helpers/isMobile';
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react';
import { createContext, useCallback, useContext, useEffect } from 'react';
import { SiweMessage } from 'siwe';
import { useConnect, useDisconnect, useSignMessage } from 'wagmi';

interface HandshakeContextProps {
  isSigningIn: boolean;
  isSigningOut: boolean;
  isSigningMessage: boolean;
  setIsSigningMessage: (isSigningMessage: boolean) => void;
  setIsSigningIn: (isSigningIn: boolean) => void;
  setIsSigningOut: (isSigningOut: boolean) => void;
}

interface HandshakeResponse {
  requestSignature: () => Promise<void>;
  isSigningIn: boolean;
  isSigningOut: boolean;
  isSigningMessage: boolean;
}

export const HandshakeContext = createContext<HandshakeContextProps>({
  isSigningIn: false,
  isSigningOut: false,
  isSigningMessage: false,
  setIsSigningMessage: (isSigningMessage: boolean) => null,
  setIsSigningIn: (isSigningIn: boolean) => null,
  setIsSigningOut: (isSigningOut: boolean) => null,
});

// use a cheapo local var to make sure we don't request more than once
let isRequestingSignature = false;

/**
 * A React hook for components that want to keep track of the wallet
 * connection process. Some things you may want to do:
 * - Hide connect buttons when signing in, or signing out, or whatever
 * - Show auth state
 * - ???
 *
 *
 * */
export function useHandshake(): HandshakeResponse {
  const { isConnected, isDisconnected, activeConnector } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const session = useSession();

  const {
    isSigningMessage,
    isSigningIn,
    isSigningOut,
    setIsSigningMessage,
    setIsSigningIn,
    setIsSigningOut,
  } = useContext(HandshakeContext);

  const requestSignature = useCallback(async () => {
    // don't sign if signing out
    if (isSigningOut) {
      return;
    }

    if (!activeConnector) {
      isRequestingSignature = false;
      throw new Error('You’re not connected to a wallet!');
    }

    const account = await activeConnector.getAccount();
    const chainId = await activeConnector.getChainId();

    setIsSigningMessage(true);

    try {
      const message = new SiweMessage({
        domain: window.location.host,
        address: account,
        statement:
          'This verifies you own your account. Daylight never submits transactions to the network and never spends any gas.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce: await getCsrfToken(),
      });

      // if this is on mobile, open the mobile app
      // (by using Rainbow's most recent wallet)
      // (This is sneaky and maybe bad!)
      console.log('Do e think this is mobile???', isMobile());

      if (isMobile()) {
        console.log('Try to connect with ', activeConnector.id);
        const activeWallet = wallet[activeConnector.id as keyof typeof wallet];

        if (!activeWallet) {
          console.log(`no active wallet found for ${activeConnector.id}`);
        } else {
          const { createConnector } = activeWallet({
            chains: activeConnector.chains,
            appName: 'Daylight',
          });
          const getUri = createConnector({ chainId }).mobile?.getUri;

          if (getUri) {
            const mobileUri = await getUri();

            console.log('mobileURI: ', mobileUri);

            if (mobileUri.startsWith('http')) {
              window.open(mobileUri, '_blank', 'noreferrer,noopener');
            } else {
              window.location.href = mobileUri;
            }
          }
        }
      }

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      setIsSigningIn(true);
      signIn('credentials', {
        message: JSON.stringify(message),
        signature,
        callbackUrl: '/',
      });
    } catch (error) {
      // Usually, this will error if they kill the connection
      // Keep it up in case they want to resume via the modal
    }

    isRequestingSignature = false;

    setIsSigningMessage(false);
  }, [activeConnector, signMessageAsync, disconnect]);

  // TODO: Should this happen by default or by "client"?
  useEffect(() => {
    // when we detect a connection (NOT ON MOBILE), handle log-in
    if (
      isConnected &&
      session.status === 'unauthenticated' &&
      activeConnector &&
      !isRequestingSignature &&
      // NOT on mobile!
      !isMobile()
    ) {
      isRequestingSignature = true;
      requestSignature();
    }

    // likewise, when we disconnect, handle sign out
    if (isDisconnected && session.status === 'authenticated') {
      setIsSigningOut(true);
      signOut();
    }
  }, [
    isConnected,
    isDisconnected,
    activeConnector,
    session.status,
    requestSignature,
  ]);

  return {
    requestSignature,
    isSigningIn,
    isSigningOut,
    isSigningMessage,
  };
}
