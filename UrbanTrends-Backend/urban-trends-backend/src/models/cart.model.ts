import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Product} from './product.model';
import {User} from './user.model';

@model({name: 'carts'})
export class Cart extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {columnName: 'id'},
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    default: 1,
    postgresql: {columnName: 'quantity'},
  })
  quantity: number;

  @belongsTo(() => User, {name: 'user'}, {postgresql: {columnName: 'user_id'}})
  user_id: number;


  @belongsTo(() => Product, {name: 'product'}, {postgresql: {columnName: 'product_id'}})
  product_id: number;


  constructor(data?: Partial<Cart>) {
    super(data);
  }
}


export interface CartRelations {
  product?: Product;
  user?: User;
}

export type CartWithRelations = Cart & CartRelations;
