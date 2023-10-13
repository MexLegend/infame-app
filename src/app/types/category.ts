import { Billboard } from "./billboard";

export type Category = {
    billboard?: Billboard;
    billboardId: string;
    createdAt?: Date;
    id?: string;
    name: string;
    products?: string[];
    storeId: string;
    updatedAt?: Date;
}