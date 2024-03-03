import { DefaultSession } from 'next-auth';

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        role: string;
    }
}

declare module 'next-auth' {
    interface Session {
        user: {
            role: string;
        } & DefaultSession['user']
    }
}