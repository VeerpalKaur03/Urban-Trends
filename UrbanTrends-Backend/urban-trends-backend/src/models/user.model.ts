import {Entity, hasMany, model, property} from '@loopback/repository';
import {Cart} from './cart.model';
import {Order} from './order.model';

@model({name: 'users'})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    // required: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    default: 'customer',
  })
  role?: string;

  @hasMany(() => Cart, {keyTo: 'userId'})
  carts: Cart[];

  @hasMany(() => Order, {keyTo: 'userId'})
  orders: Order[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
