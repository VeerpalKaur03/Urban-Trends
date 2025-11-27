import {Entity, hasMany, model, property} from '@loopback/repository';
import {Cart} from './cart.model';
import {OrderItem} from './order-item.model';

@model({name: 'products'})
export class Product extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'number',
    required: true,
  })
  stock: number;

  @property({
    type: 'string',
    required: true,
  })
  category: string;

  @property({
    type: 'string',
    required: true,
  })
  image_url: string;

  @hasMany(() => Cart, {keyTo: 'product_id'})
  carts: Cart[];

  @hasMany(() => OrderItem, {keyTo: 'product_id'})
  orderItems: OrderItem[];

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
