import {Getter, inject} from '@loopback/core';
import {
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {SequelizeCrudRepository} from '@loopback/sequelize';

import {UrbanTrendsDbDataSource} from '../datasources';
import {Cart, Order, User, UserRelations} from '../models';
import {CartRepository} from './cart.repository';
import {OrderRepository} from './order.repository';

export class UserRepository extends SequelizeCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly carts: HasManyRepositoryFactory<
    Cart,
    typeof User.prototype.id
  >;

  public readonly orders: HasManyRepositoryFactory<
    Order,
    typeof User.prototype.id
  >;

  constructor(
    @inject('datasources.urbanTrendsDB')
    dataSource: UrbanTrendsDbDataSource,
    @repository.getter('CartRepository')
    protected cartRepositoryGetter: Getter<CartRepository>,
    @repository.getter('OrderRepository')
    protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(User, dataSource);

    this.orders = this.createHasManyRepositoryFactoryFor(
      'orders',
      orderRepositoryGetter,
    );
    this.registerInclusionResolver(
      'orders',
      this.orders.inclusionResolver,
    );

    this.carts = this.createHasManyRepositoryFactoryFor(
      'carts',
      cartRepositoryGetter,
    );
    this.registerInclusionResolver('carts', this.carts.inclusionResolver);
  }
}
