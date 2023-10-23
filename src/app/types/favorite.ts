import { Product } from "./product";
import { User } from "./user";

export interface Favorite {
    userId: string;
    user?: User;
    productIds: string[];
    products?: Product[];
    id?: string;
}