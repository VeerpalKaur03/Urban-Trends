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
import {Order} from '../models';
import {CartRepository, OrderItemRepository, OrderRepository, ProductRepository, UserRepository} from '../repositories';


export class OrderController {
  constructor(
    @repository(OrderRepository)
    public orderRepository: OrderRepository,

    @repository(UserRepository)
    public userRepository: UserRepository,

    @repository(ProductRepository)
    public productRepository: ProductRepository,

    @repository(CartRepository)
    public cartRepository: CartRepository,

    @repository(OrderItemRepository)
    public orderItemRepository: OrderItemRepository,
  ) { }


  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKey.CreateOrders],
  })
  @post('/orders/{userId}')
  @response(200, {
    description: 'Order model instance',
    content: {'application/json': {schema: getModelSchemaRef(Order)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'NewOrder',
            // exclude: ['id'],
          }),
        },
      },
    })
    @param.path.number('userId') userId: number

  ): Promise<Order> {

    const cartItems = await this.cartRepository.find({
      where: {userId}
    });

    if (cartItems.length === 0) {
      throw new Error('Cart is empty. Cannot place order.');
    }

    // add logic to calculate total price

    // let totalAmount = 0;
    // for (const item of cartItems) {
    //   const product = await this.productRepository.findById(item.productId);
    //   totalAmount += product.price * item.quantity;

    // }


    const newOrder = await this.orderRepository.create({
      // totalAmount,
      status: 'Placed',
      userId,
    });

    console.log('newOrder', newOrder);


    for (const item of cartItems) {
      const product = await this.productRepository.findById(item.productId);

      await this.orderRepository.orderItems(newOrder.id).create({
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase: product.price,
      });
    }



    // Clear the cart after placing the order
    for (const item of cartItems) {
      await this.cartRepository.deleteById(item.id);
    }

    return newOrder;
  }



  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKey.ViewOrders],
  })
  @get('/orders/user/{userId}')
  @response(200, {
    description: 'Array of Order model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Order, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.path.number('userId') userId: number,
  ): Promise<Order[]> {
    return this.orderRepository.find({
      where: {userId},
      include: [
        {
          relation: 'orderItems',
          scope: {
            include: [{relation: 'product'}]
          }
        }
      ]

    });
  }


  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKey.ViewOrders],
  })

  @get('/orders/{id}')
  @response(200, {
    description: 'Order model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Order, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Order, {exclude: 'where'}) filter?: FilterExcludingWhere<Order>
  ): Promise<Order> {
    return this.orderRepository.findById(id, filter);
  }





  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKey.DeleteOrders],
  })
  @del('/orders/{id}')
  @response(204, {
    description: 'Order DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.orderRepository.deleteById(id);
  }
}
