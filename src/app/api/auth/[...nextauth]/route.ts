import NextAuth from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      async profile(profile: GoogleProfile) {
        let role = 'member';

        if (profile.email === 'applefunboy98@gmail.com') {
          role = 'admin';
        }

        return {
          id: profile.sub,
          name: profile.name,
          firstname: profile.given_name,
          lastname: profile.family_name,
          email: profile.email,
          image: profile.picture,
          role,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    jwt: ({ token, account }) => {
      if (account?.id_token) {
        token.id_token = account.id_token;
      }
      if (account?.refresh_token) {
        token.refresh_token = account.refresh_token;
      }
      return token;
    },
    session: ({ session }) => session,
  },
});

export { handler as GET, handler as POST };
