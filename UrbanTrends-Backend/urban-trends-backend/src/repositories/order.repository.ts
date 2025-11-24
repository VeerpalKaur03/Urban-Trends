import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {UrbanTrendsDbDataSource} from '../datasources';
import {Order, OrderRelations, User, OrderItem} from '../models';
import {UserRepository} from './user.repository';
import {OrderItemRepository} from './order-item.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.id,
  OrderRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Order.prototype.id>;

  public readonly orderItems: HasManyRepositoryFactory<OrderItem, typeof Order.prototype.id>;

  constructor(
    @inject('datasources.urbanTrendsDB') dataSource: UrbanTrendsDbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('OrderItemRepository') protected orderItemRepositoryGetter: Getter<OrderItemRepository>,
  ) {
    super(Order, dataSource);
    this.orderItems = this.createHasManyRepositoryFactoryFor('orderItems', orderItemRepositoryGetter,);
    this.registerInclusionResolver('orderItems', this.orderItems.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
