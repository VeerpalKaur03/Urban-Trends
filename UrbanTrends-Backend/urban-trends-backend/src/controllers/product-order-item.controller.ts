import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  OrderItem,
  Product,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductOrderItemController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/order-items', {
    responses: {
      '200': {
        description: 'Array of Product has many OrderItem',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OrderItem)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<OrderItem>,
  ): Promise<OrderItem[]> {
    return this.productRepository.orderItems(id).find(filter);
  }

  @post('/products/{id}/order-items', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrderItem)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Product.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderItem, {
            title: 'NewOrderItemInProduct',
            exclude: ['id'],
            optional: ['product_id']
          }),
        },
      },
    }) orderItem: Omit<OrderItem, 'id'>,
  ): Promise<OrderItem> {
    return this.productRepository.orderItems(id).create(orderItem);
  }

  @patch('/products/{id}/order-items', {
    responses: {
      '200': {
        description: 'Product.OrderItem PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderItem, {partial: true}),
        },
      },
    })
    orderItem: Partial<OrderItem>,
    @param.query.object('where', getWhereSchemaFor(OrderItem)) where?: Where<OrderItem>,
  ): Promise<Count> {
    return this.productRepository.orderItems(id).patch(orderItem, where);
  }

  @del('/products/{id}/order-items', {
    responses: {
      '200': {
        description: 'Product.OrderItem DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(OrderItem)) where?: Where<OrderItem>,
  ): Promise<Count> {
    return this.productRepository.orderItems(id).delete(where);
  }
}
