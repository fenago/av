import NextAuth, { DefaultSession } from 'next-auth';
import { UserRole } from './user';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's id. */
      id: string;
      /** The user's role. */
      role?: UserRole;
      /** The user's feature access. */
      features?: any;
    } & DefaultSession['user'];
  }
}
