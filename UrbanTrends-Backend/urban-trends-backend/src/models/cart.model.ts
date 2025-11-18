import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Product} from './product.model';
import {User} from './user.model';

@model({name: 'carts'})
export class Cart extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    required: false,
  })
  id?: number;


  @property({
    type: 'number',
    required: true,
    default: 1,
  })
  quantity: number;


  @belongsTo(() => User)
  userId: number;

  @belongsTo(() => Product)
  productId: number;

  constructor(data?: Partial<Cart>) {
    super(data);
  }
}

export interface CartRelations {
  // describe navigational properties here
  product?: Product;
  user?: User;

}

export type CartWithRelations = Cart & CartRelations;
