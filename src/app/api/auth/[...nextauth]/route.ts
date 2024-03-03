import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { AdapterUser } from 'next-auth/adapters';

interface CustomUser extends AdapterUser {
  role: string;
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      profile(profile, tokens) {
        let role = 'member';

        if (profile.email === 'applefunboy98@gmail.com') {
          role = 'admin';
        }

        return {
          id: tokens.id_token || profile.id,
          ...profile,
          image: profile.picture,
          role,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        if ('role' in user) {
          token.role = (user as CustomUser).role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        if ('role' in token) {
          session.user.role = token.role;
        }
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
