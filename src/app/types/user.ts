export type Gender = "Male" | "Female" | "Other";

export type UserRole = "ADMINISTRADOR" | "ABOGADO" | "CLIENTE" | "NUEVO";

export interface UserImage {
    url: string,
    public_id: string
}

export type User = {
    email: string,
    cellphone: string,
    first_name: string,
    last_name: string,
    password: string,
    gender?: Gender,
    image?: UserImage,
    is_confirmed?: boolean,
    is_deleted?: boolean,
    role?: UserRole,
    code?: number,
    createdAt?: Date,
    updatedAt?: Date,
    _id?: string
}