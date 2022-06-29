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
  message: SiweMessage | undefined;
  setIsSigningMessage: (isSigningMessage: boolean) => void;
  setIsSigningIn: (isSigningIn: boolean) => void;
  setIsSigningOut: (isSigningOut: boolean) => void;
  setMessage: (message?: SiweMessage) => void;
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
  message: undefined,
  setIsSigningMessage: (isSigningMessage: boolean) => null,
  setIsSigningIn: (isSigningIn: boolean) => null,
  setIsSigningOut: (isSigningOut: boolean) => null,
  setMessage: (message?: SiweMessage) => null,
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
    message,
    setIsSigningMessage,
    setIsSigningIn,
    setIsSigningOut,
    setMessage,
  } = useContext(HandshakeContext);

  const saveMessage = useCallback(async () => {
    if (!activeConnector) {
      throw new Error(
        `[saveMessage] Missing some info, activeConnector: ${activeConnector} `
      );
    }

    const chainId = await activeConnector.getChainId();
    const address = await activeConnector.getAccount();

    const msg = new SiweMessage({
      domain: window.location.host,
      address: address,
      statement:
        'This verifies you own your account. Daylight never submits transactions to the network and never spends any gas.',
      uri: window.location.origin,
      version: '1',
      chainId,
      nonce: await getCsrfToken(),
    });

    console.log('addr: ', address, 'and msg: ', msg);

    setMessage(msg);
  }, [session.data, activeConnector]);

  const requestSignature = useCallback(async () => {
    // don't sign if signing out
    if (isSigningOut || isRequestingSignature || !message) {
      throw new Error(
        `[requestSignature] Missing some info, isSigningOut: ${isSigningOut} isRequestingSignature: ${isRequestingSignature} message: ${message} `
      );
      return;
    }

    isRequestingSignature = true;

    if (!activeConnector) {
      isRequestingSignature = false;
      throw new Error('You’re not connected to a wallet!');
    }

    setIsSigningMessage(true);

    try {
      // if this is on mobile, open the mobile app
      // (by using Rainbow's most recent wallet)
      // (This is sneaky and maybe bad!)
      console.log('Do e think this is mobile???', isMobile());

      // if (isMobile()) {
      //   console.log('Try to connect with ', activeConnector.id);
      //   const activeWallet = wallet[activeConnector.id as keyof typeof wallet];

      //   if (!activeWallet) {
      //     console.log(`no active wallet found for ${activeConnector.id}`);
      //   } else {
      //     const { createConnector } = activeWallet({
      //       chains: activeConnector.chains,
      //       appName: 'Daylight',
      //     });
      //     const getUri = createConnector({ chainId }).mobile?.getUri;

      //     if (getUri) {
      //       const mobileUri = await getUri();

      //       console.log('mobileURI: ', mobileUri);

      //       if (mobileUri.startsWith('http')) {
      //         window.open(mobileUri, '_blank', 'noreferrer,noopener');
      //       } else {
      //         window.location.href = mobileUri;
      //       }
      //     }
      //   }
      // }

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
  }, [message, signMessageAsync, disconnect]);

  useEffect(() => {
    // assemble the message as soon as we can
    if (isConnected && session.status !== 'authenticated' && activeConnector) {
      saveMessage();
    }
  }, [isConnected, activeConnector, session.status, saveMessage]);

  // TODO: Should this happen by default or by "client"?
  // when we detect a connection (NOT ON MOBILE), handle log-in
  useEffect(() => {
    if (message && !isMobile()) {
      requestSignature();
    }
  }, [
    isConnected,
    isDisconnected,
    activeConnector,
    session.status,
    requestSignature,
  ]);

  // when we disconnect, handle sign out
  useEffect(() => {
    if (isDisconnected && session.status === 'authenticated') {
      setIsSigningOut(true);
      setMessage(undefined);
      signOut();
    }
  }, [isDisconnected, session.status]);

  return {
    requestSignature,
    isSigningIn,
    isSigningOut,
    isSigningMessage,
  };
}
