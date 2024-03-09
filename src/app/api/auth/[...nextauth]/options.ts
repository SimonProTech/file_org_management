import GoogleProvider from 'next-auth/providers/google';
import { AuthOptions, Profile } from 'next-auth';

interface CustomProfile extends Profile {
  role?: string;
}

const options: AuthOptions = {
  providers: [
    GoogleProvider({
      profile(profile) {
        let role;

        if (profile.email === 'applefunboy98@gmail.com') {
          role = 'admin';
        }

        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
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
        token.sub = user.id;
        token.role = (user as CustomProfile).role;
      }
      return token;
    },

    async session({
      session, token,
    }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
};

export default options;
