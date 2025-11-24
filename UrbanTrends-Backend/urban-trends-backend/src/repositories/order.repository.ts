import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {SequelizeCrudRepository} from '@loopback/sequelize';

import {UrbanTrendsDbDataSource} from '../datasources';
import {Order, OrderItem, OrderRelations, User} from '../models';
import {OrderItemRepository} from './order-item.repository';
import {UserRepository} from './user.repository';


export class OrderRepository extends SequelizeCrudRepository<
  Order,
  typeof Order.prototype.id,
  OrderRelations
> {
  public readonly user: BelongsToAccessor<
    User,
    typeof Order.prototype.id
  >;

  public readonly orderItems: HasManyRepositoryFactory<
    OrderItem,
    typeof Order.prototype.id
  >;

  constructor(
    @inject('datasources.urbanTrendsDB')
    dataSource: UrbanTrendsDbDataSource,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
    @repository.getter('OrderItemRepository')
    protected orderItemRepositoryGetter: Getter<OrderItemRepository>,
  ) {
    super(Order, dataSource);

    this.orderItems = this.createHasManyRepositoryFactoryFor(
      'orderItems',
      orderItemRepositoryGetter,
    );
    this.registerInclusionResolver(
      'orderItems',
      this.orderItems.inclusionResolver,
    );

    this.user = this.createBelongsToAccessorFor(
      'user',
      userRepositoryGetter,
    );
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
