import {belongsTo, Entity, model, property} from '@loopback/repository';
import {User} from './user.model';

@model({name: 'orders'})
export class Order extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    required: false,
  })
  id?: number;

  @property({
    type: 'number',
    required: false,
  })
  totalAmount?: number;

  @property({
    type: 'string',
    required: false,
  })
  status?: string;

  @belongsTo(() => User)
  userId: number;

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
