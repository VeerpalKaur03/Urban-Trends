import {
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response
} from '@loopback/rest';
import {authenticate, STRATEGY} from 'loopback4-authentication';
import {authorize} from 'loopback4-authorization';
import {PermissionKey} from '../enums/permissions.enum';
import {Cart} from '../models';
import {CartRepository} from '../repositories';

export class CartController {
  constructor(
    @repository(CartRepository)
    public cartRepository: CartRepository,
  ) { }


  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKey.AddToCart],
  })
  @post('/carts')
  @response(200, {
    description: 'Cart model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cart)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cart, {
            title: 'NewCart',
            // exclude: ['id'],
          }),
        },
      },
    })
    cart: Cart,
  ): Promise<Cart> {
    const {userId, productId} = cart;
    console.log('Adding to cart - userId:', userId, 'productId:', productId);

    const existingCartItem = await this.cartRepository.findOne({
      where: {
        userId: userId,
        productId: productId,
      },
    });

    if (existingCartItem) {
      existingCartItem.quantity += 1;
      await this.cartRepository.update(existingCartItem);
      return existingCartItem;
    }

    const newCart = await this.cartRepository.create({
      id: cart.id,
      userId: cart.userId,
      productId: cart.productId,
      quantity: cart.quantity,

    });

    return newCart;


  }


  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKey.ViewCart],
  })
  @get('/carts/user/{userId}')
  @response(200, {
    description: 'Array of Cart model instances with product info',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cart, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.path.number('userId') userId: number,
  ): Promise<Cart[]> {
    return this.cartRepository.find({
      where: {userId},
      include: [{relation: 'product'}],
    });
  }


  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKey.ViewCart],
  })
  @get('/carts/{id}')
  @response(200, {
    description: 'Cart model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cart, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Cart, {exclude: 'where'}) filter?: FilterExcludingWhere<Cart>
  ): Promise<Cart> {
    return this.cartRepository.findById(id, filter);
  }




  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKey.RemoveFromCart],
  })
  @del('/carts/{id}')
  @response(204, {
    description: 'Cart DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.cartRepository.deleteById(id);
  }
}
