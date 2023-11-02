import { Product } from "./product";
import { SafeUser } from "./user";

export type Order = {
  address?: string;
  createdAt?: Date;
  id?: string;
  isPaid?: boolean;
  orderItems: OrderItem[];
  phone?: string;
  storeId: string;
  updatedAt?: Date;
  userId: string | null;
  user?: SafeUser;
}

export type OrderItem = {
  id?: string;
  orderId?: string;
  productId: string;
  product?: Product;
  quantity: number;
  colorId: string;
  colorName?: string;
  sizeId: string;
  sizeName?: string;
}

export type UpdateOrderProductQuantity = {
  index: number;
  quantity: number;
}

export type GraphData = {
  name: string;
  value: number;
}

export type OrderCheckoutResponse = {
  url: string;
}