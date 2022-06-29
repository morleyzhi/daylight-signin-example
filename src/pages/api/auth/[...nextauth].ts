import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getCsrfToken } from 'next-auth/react';
import { SiweMessage } from 'siwe';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    CredentialsProvider({
      name: 'Ethereum',
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
          placeholder: '0x0',
        },
        signature: {
          label: 'Signature',
          type: 'text',
          placeholder: '0x0',
        },
      },
      async authorize(credentials) {
        const siwe = new SiweMessage(JSON.parse(credentials?.message || '{}'));
        const nextAuthUrl = new URL(
          process.env.NEXTAUTH_URL || 'http://localhost:3000'
        );
        if (siwe.domain !== nextAuthUrl.host) {
          console.log(
            "Domain doesn't match, provided domain",
            siwe.domain,
            'but expected ',
            nextAuthUrl.host
          );

          console.log(
            "Domain doesn't match: ",
            siwe.domain,
            'vs. expected',
            nextAuthUrl.host
          );
          return null;
        }

        if (siwe.nonce !== (await getCsrfToken({ req }))) {
          console.log("Nonce doesn't equal csrf token");
          return null;
        }

        try {
          await siwe.validate(credentials?.signature || '');
        } catch (e) {
          console.log(
            'Failed to validate signature: ',
            (e as Error).toString()
          );
          return null;
        }

        const address = siwe.address.toLowerCase();

        return {
          // this gets set as the "sub" param in the jwt
          id: address,
        };
      },
    }),
  ];

  const isDefaultSigninPage =
    req.method === 'GET' && req.query.nextauth.includes('signin');

  // Hides Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    providers.pop();
  }

  return await NextAuth(req, res, {
    // https://next-auth.js.org/configuration/providers/oauth
    providers,
    session: {
      strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async jwt({ token }) {
        if (token?.sub) {
          token.address = token.sub;
        }

        return token;
      },

      async session({ session, token }) {
        if (token?.address) {
          session.address = token.address as string;
        }
        return session;
      },
    },
  });
}
