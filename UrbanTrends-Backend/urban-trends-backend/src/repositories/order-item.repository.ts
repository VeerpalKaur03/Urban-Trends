import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {UrbanTrendsDbDataSource} from '../datasources';
import {OrderItem, OrderItemRelations, Product, Order} from '../models';
import {ProductRepository} from './product.repository';
import {OrderRepository} from './order.repository';

export class OrderItemRepository extends DefaultCrudRepository<
  OrderItem,
  typeof OrderItem.prototype.id,
  OrderItemRelations
> {

  public readonly product: BelongsToAccessor<Product, typeof OrderItem.prototype.id>;

  public readonly order: BelongsToAccessor<Order, typeof OrderItem.prototype.id>;

  constructor(
    @inject('datasources.urbanTrendsDB') dataSource: UrbanTrendsDbDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(OrderItem, dataSource);
    this.order = this.createBelongsToAccessorFor('order', orderRepositoryGetter,);
    this.registerInclusionResolver('order', this.order.inclusionResolver);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter,);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
  }
}
