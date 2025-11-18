import { Product } from './product.model';

export interface Cart {
  id?: number;
  userId: number;
  productId: number;
  quantity: number;
  product?: Product;
}
