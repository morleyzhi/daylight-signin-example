import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { SessionProvider } from 'next-auth/react';
import { infuraProvider } from 'wagmi/providers/infura';
import '@rainbow-me/rainbowkit/styles.css';
import { WagmiConfig, createClient, chain, configureChains } from 'wagmi';
import type { AppProps } from 'next/app';
import 'styles/globals.css';
import { WalletConnectionProvider } from 'components/WalletConnectionProvider';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.ropsten, chain.rinkeby],
  [infuraProvider({ infuraId: process.env.REACT_APP_INFURA_ID })]
);

const { connectors } = getDefaultWallets({
  appName: 'Daylight Web App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <WalletConnectionProvider>
            <Component {...pageProps} />
          </WalletConnectionProvider>
        </SessionProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default MyApp;
