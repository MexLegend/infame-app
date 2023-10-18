import { Billboard } from "./billboard";
import { Product } from "./product";

export type Category = {
    billboard?: Billboard;
    billboardId: string;
    createdAt?: Date;
    id?: string;
    name: string;
    products?: Product[];
    storeId: string;
    updatedAt?: Date;
}