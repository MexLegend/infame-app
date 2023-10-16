import { Category } from "./category";
import { Color } from "./color";
import { Image } from "./image";
import { Size } from "./size";
import { User } from './user';

export type FavoriteProducts = {
    id: string;
    product: Product;
    user: User;
}

export type Product = {
    category?: Category;
    categoryId: string;
    colors?: Color[];
    colorIds: string[];
    createdAt?: Date;
    description: string;
    id?: string;
    images: Image[];
    isArchived: boolean;
    isFeatured: boolean;
    name: string;
    orderItems?: string[];
    price: number;
    sizes?: Size[];
    sizeIds: string[];
    stock: number;
    storeId: string;
    updatedAt?: Date;
    favoriteProducts?: FavoriteProducts[];
}