import { Image } from "./image";

export type Color = {
    createdAt?: Date;
    id?: string;
    name: string;
    color: string;
    products?: string[];
    storeId: string;
    updatedAt?: Date;
}