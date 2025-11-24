import {
  Filter,
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
import {OrderItem} from '../models';
import {OrderItemRepository} from '../repositories';

export class OrderItemController {
  constructor(
    @repository(OrderItemRepository)
    public orderItemRepository: OrderItemRepository,
  ) { }

  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKey.CreateOrders],
  })
  @post('/order-items')
  @response(200, {
    description: 'OrderItem model instance',
    content: {'application/json': {schema: getModelSchemaRef(OrderItem)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderItem, {
            title: 'NewOrderItem',
            exclude: ['id'],
          }),
        },
      },
    })
    orderItem: Omit<OrderItem, 'id'>,
  ): Promise<OrderItem> {
    return this.orderItemRepository.create(orderItem);
  }


  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKey.ViewOrders],
  })
  @get('/order-items')
  @response(200, {
    description: 'Array of OrderItem model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OrderItem, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OrderItem) filter?: Filter<OrderItem>,
  ): Promise<OrderItem[]> {
    return this.orderItemRepository.find(filter);
  }


  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKey.CreateOrders],
  })
  @get('/order-items/{id}')
  @response(200, {
    description: 'OrderItem model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OrderItem, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(OrderItem, {exclude: 'where'}) filter?: FilterExcludingWhere<OrderItem>
  ): Promise<OrderItem> {
    return this.orderItemRepository.findById(id, filter);
  }



  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKey.DeleteOrders],
  })
  @del('/order-items/{id}')
  @response(204, {
    description: 'OrderItem DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.orderItemRepository.deleteById(id);
  }
}
