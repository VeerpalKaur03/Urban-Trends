import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {UrbanTrendsDbDataSource} from '../datasources';
import {Product, ProductRelations, Cart, OrderItem} from '../models';
import {CartRepository} from './cart.repository';
import {OrderItemRepository} from './order-item.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {

  public readonly carts: HasManyRepositoryFactory<Cart, typeof Product.prototype.id>;

  public readonly orderItems: HasManyRepositoryFactory<OrderItem, typeof Product.prototype.id>;

  constructor(
    @inject('datasources.urbanTrendsDB') dataSource: UrbanTrendsDbDataSource, @repository.getter('CartRepository') protected cartRepositoryGetter: Getter<CartRepository>, @repository.getter('OrderItemRepository') protected orderItemRepositoryGetter: Getter<OrderItemRepository>,
  ) {
    super(Product, dataSource);
    this.orderItems = this.createHasManyRepositoryFactoryFor('orderItems', orderItemRepositoryGetter,);
    this.registerInclusionResolver('orderItems', this.orderItems.inclusionResolver);
    this.carts = this.createHasManyRepositoryFactoryFor('carts', cartRepositoryGetter,);
    this.registerInclusionResolver('carts', this.carts.inclusionResolver);
  }
}
