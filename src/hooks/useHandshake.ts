import { isMobile } from 'helpers/isMobile';
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react';
import { createContext, useCallback, useContext, useEffect } from 'react';
import { SiweMessage } from 'siwe';
import { useConnect, useDisconnect, useSignMessage, useAccount } from 'wagmi';

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
  const { isDisconnected, activeConnector } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: accountData } = useAccount();
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

  const { signMessage } = useSignMessage({
    message: message ? message.prepareMessage() : 'Not ready!',
    onSuccess: (signature) => {
      setIsSigningIn(true);
      signIn('credentials', {
        message: JSON.stringify(message),
        signature,
        callbackUrl: '/',
      });
    },
  });

  const saveMessage = useCallback(async () => {
    const chainId = await activeConnector?.getChainId();

    const msg = new SiweMessage({
      domain: window.location.host,
      address: accountData?.address,
      statement:
        'This verifies you own your account. Daylight never submits transactions to the network and never spends any gas.',
      uri: window.location.origin,
      version: '1',
      chainId,
      nonce: await getCsrfToken(),
    });

    setMessage(msg);
  }, [session.status, activeConnector, accountData?.address]);

  useEffect(() => {
    // assemble the message as soon as we can
    if (
      session.status !== 'authenticated' &&
      accountData?.address &&
      activeConnector
    ) {
      saveMessage();
    }
  }, [session.status, activeConnector, accountData?.address]);

  const requestSignature = useCallback(async () => {
    // don't sign if signing out
    if (isSigningOut || isRequestingSignature || !message) {
      throw new Error(
        `[requestSignature] Missing some info, isSigningOut: ${isSigningOut} isRequestingSignature: ${isRequestingSignature} message: ${JSON.stringify(
          message
        )} `
      );
    }

    isRequestingSignature = true;

    setIsSigningMessage(true);

    signMessage();

    isRequestingSignature = false;
    setIsSigningMessage(false);
  }, [message, signMessage, disconnect]);

  // TODO: Should this happen by default or by "client"?
  // when we detect a connection (NOT ON MOBILE), handle log-in
  useEffect(() => {
    if (message && !isMobile()) {
      requestSignature();
    }
  }, [message, requestSignature]);

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
