import { PrismaClient } from '@prisma/client';

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL: string;
      SEND_DIGESTS_PASSWORD: string;
      SENDGRID_KEY_SEND: string;
    }
  }
}
