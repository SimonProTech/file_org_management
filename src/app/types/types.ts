export interface User {
    user: {
        name: string | null | undefined;
        email: string | null | undefined;
        image: string | null | undefined;
    } | null;
}
