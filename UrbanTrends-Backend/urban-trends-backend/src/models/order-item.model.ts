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
  priceAtPurchase: number;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @belongsTo(() => Product)
  productId: number;

  @belongsTo(() => Order)
  orderId: number;

  constructor(data?: Partial<OrderItem>) {
    super(data);
  }
}

export interface OrderItemRelations {
  // describe navigational properties here
}

export type OrderItemWithRelations = OrderItem & OrderItemRelations;
