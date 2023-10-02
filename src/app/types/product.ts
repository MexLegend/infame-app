import { Category } from "./category";
import { User } from './user';

export type FavoriteProducts = {
    id: string;
    product: Product;
    user: User;
}

export type Product = {
    category: Category;
    categoryId: string;
    colors: string[];
    createdAt?: Date;
    description: string;
    id: string;
    images: string[];
    isArchived: boolean;
    isFeatured: boolean;
    name: string;
    orderItems: string[];
    price: number;
    sizes: string[];
    stock: number;
    store: string;
    storeId: string;
    updatedAt?: Date;
    favoriteProducts: FavoriteProducts[];
}