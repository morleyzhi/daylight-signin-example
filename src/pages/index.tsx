import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { ConnectButton } from '@rainbow-me/rainbowkit';

type HomeProps = {
  session: Session;
};

const Home: NextPage<HomeProps> = ({ session }) => {
  return (
    <>
      {session?.address ? (
        <p>You are signed in with {session.address}.</p>
      ) : (
        <>
          <p>Please sign in, friend.</p>

          <ConnectButton
            chainStatus="none"
            showBalance={false}
            accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }}
          />
        </>
      )}
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
};
