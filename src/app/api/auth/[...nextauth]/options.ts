import GoogleProvider from 'next-auth/providers/google';
import { AuthOptions } from 'next-auth';

const options: AuthOptions = {
  providers: [
    GoogleProvider({
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
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
        token.sub = user.id;
      }
      return token;
    },

    async session({
      session, token,
    }) {
      if (session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
};

export default options;
