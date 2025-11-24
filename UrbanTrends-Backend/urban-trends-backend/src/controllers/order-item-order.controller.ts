import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  OrderItem,
  Order,
} from '../models';
import {OrderItemRepository} from '../repositories';

export class OrderItemOrderController {
  constructor(
    @repository(OrderItemRepository)
    public orderItemRepository: OrderItemRepository,
  ) { }

  @get('/order-items/{id}/order', {
    responses: {
      '200': {
        description: 'Order belonging to OrderItem',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Order),
          },
        },
      },
    },
  })
  async getOrder(
    @param.path.number('id') id: typeof OrderItem.prototype.id,
  ): Promise<Order> {
    return this.orderItemRepository.order(id);
  }
}
