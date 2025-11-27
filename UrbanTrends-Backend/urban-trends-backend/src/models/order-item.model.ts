import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Order} from './order.model';
import {Product} from './product.model';

@model({name: 'order_items'})
export class OrderItem extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @belongsTo(() => Product, {name: 'product'}, {postgresql: {columnName: 'product_id'}})
  product_id: number;

  @belongsTo(() => Order, {name: 'order'}, {postgresql: {columnName: 'order_id'}})
  order_id: number;

  constructor(data?: Partial<OrderItem>) {
    super(data);
  }
}

export interface OrderItemRelations {
  // describe navigational properties here
}

export type OrderItemWithRelations = OrderItem & OrderItemRelations;
