import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  repository,
} from '@loopback/repository';
import {SequelizeCrudRepository} from '@loopback/sequelize';

import {UrbanTrendsDbDataSource} from '../datasources';
import {Order, OrderItem, OrderItemRelations, Product} from '../models';
import {OrderRepository} from './order.repository';
import {ProductRepository} from './product.repository';

export class OrderItemRepository extends SequelizeCrudRepository<
  OrderItem,
  typeof OrderItem.prototype.id,
  OrderItemRelations
> {
  public readonly product: BelongsToAccessor<
    Product,
    typeof OrderItem.prototype.id
  >;

  public readonly order: BelongsToAccessor<
    Order,
    typeof OrderItem.prototype.id
  >;

  constructor(
    @inject('datasources.urbanTrendsDB')
    dataSource: UrbanTrendsDbDataSource,
    @repository.getter('ProductRepository')
    protected productRepositoryGetter: Getter<ProductRepository>,
    @repository.getter('OrderRepository')
    protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(OrderItem, dataSource);

    this.order = this.createBelongsToAccessorFor(
      'order',
      orderRepositoryGetter,
    );
    this.registerInclusionResolver('order', this.order.inclusionResolver);

    this.product = this.createBelongsToAccessorFor(
      'product',
      productRepositoryGetter,
    );
    this.registerInclusionResolver(
      'product',
      this.product.inclusionResolver,
    );
  }
}
