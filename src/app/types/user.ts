import { Image } from "./image";

export type UserRole = "ADMIN" | "CLIENT";

export interface Tokens {
    access_token: string;
    refresh_token: string;
}

export interface SafeUser extends Partial<User>, Partial<Tokens> {
    createdAt: Date;
    id: string;
    updatedAt: Date;
}

export type User = {
    email: string;
    image?: Image;
    firstName: string;
    lastName: string;
    password?: string;
    role: UserRole;
}