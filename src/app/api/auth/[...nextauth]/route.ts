import NextAuth, { Profile } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import options from '@/app/api/auth/[...nextauth]/options';

const handler = NextAuth(options);

export { handler as GET, handler as POST };
