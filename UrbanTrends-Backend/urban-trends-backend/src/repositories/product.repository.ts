import {Getter, inject} from '@loopback/core';
import {HasManyRepositoryFactory, repository} from '@loopback/repository';
import {SequelizeCrudRepository} from '@loopback/sequelize';

import {UrbanTrendsDbDataSource} from '../datasources';
import {Cart, OrderItem, Product, ProductRelations} from '../models';
import {CartRepository} from './cart.repository';
import {OrderItemRepository} from './order-item.repository';

export class ProductRepository extends SequelizeCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {
  public readonly carts: HasManyRepositoryFactory<
    Cart,
    typeof Product.prototype.id
  >;

  public readonly orderItems: HasManyRepositoryFactory<
    OrderItem,
    typeof Product.prototype.id
  >;

  constructor(
    @inject('datasources.urbanTrendsDB')
    dataSource: UrbanTrendsDbDataSource,
    @repository.getter('CartRepository')
    protected cartRepositoryGetter: Getter<CartRepository>,
    @repository.getter('OrderItemRepository')
    protected orderItemRepositoryGetter: Getter<OrderItemRepository>,
  ) {
    super(Product, dataSource);

    this.orderItems = this.createHasManyRepositoryFactoryFor(
      'orderItems',
      orderItemRepositoryGetter,
    );
    this.registerInclusionResolver(
      'orderItems',
      this.orderItems.inclusionResolver,
    );

    this.carts = this.createHasManyRepositoryFactoryFor(
      'carts',
      cartRepositoryGetter,
    );
    this.registerInclusionResolver('carts', this.carts.inclusionResolver);
  }
}
