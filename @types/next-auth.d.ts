// next-auth.d.ts

import { User } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: User & {
            role: string;
        }
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        role?: string;
    }
}
