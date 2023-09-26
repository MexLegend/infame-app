import { Category } from "./category";

export type Billboard = {
    createdAt?: Date;
    updatedAt?: Date;
    categories: Category[];
    id?: string;
    imageUrl: string;
    label: string;
    description: string;
    store: string;
    storeId: string;
}