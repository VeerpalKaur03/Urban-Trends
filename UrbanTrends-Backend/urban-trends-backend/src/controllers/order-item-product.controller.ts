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
  Product,
} from '../models';
import {OrderItemRepository} from '../repositories';

export class OrderItemProductController {
  constructor(
    @repository(OrderItemRepository)
    public orderItemRepository: OrderItemRepository,
  ) { }

  @get('/order-items/{id}/product', {
    responses: {
      '200': {
        description: 'Product belonging to OrderItem',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Product),
          },
        },
      },
    },
  })
  async getProduct(
    @param.path.number('id') id: typeof OrderItem.prototype.id,
  ): Promise<Product> {
    return this.orderItemRepository.product(id);
  }
}
