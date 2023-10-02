import { Product } from "./product";

export type Order = {
  address: string;
  createdAt?: Date;
  id: string;
  isPaid: boolean;
  orderItems: OrderItem[];
  phone: string;
  storeId: string;
  updatedAt?: Date;
}

export type OrderItem = {
  id: string;
  orderId: string;
  productId: Product;
  quantity: number;
}