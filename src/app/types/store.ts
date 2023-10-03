import { User } from './user';
import { Size } from './size';
import { Product } from './product';
import { Order } from './order';
import { Color } from './color';
import { Category } from './category';
import { Billboard } from './billboard';

export type Store = {
    name: string;
    userId: string;
}

export interface SafeStore extends User {
    billboards: Billboard[];
    categories: Category[];
    colors: Color[];
    createdAt: Date;
    id: string;
    orders: Order[];
    products: Product[];
    sizes: Size[];
    updatedAt: Date;
    user: User;
    web: string;
}