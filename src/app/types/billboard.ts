import { Category } from "./category";
import { Image } from "./image";

export type Billboard = {
    createdAt?: Date;
    updatedAt?: Date;
    categories?: Category[];
    id?: string;
    image: Image;
    label: string;
    description: string;
    store?: string;
    storeId: string;
}