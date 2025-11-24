import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  repository,
} from '@loopback/repository';
import {SequelizeCrudRepository} from '@loopback/sequelize';

import {UrbanTrendsDbDataSource} from '../datasources';
import {Cart, CartRelations, Product, User} from '../models';
import {ProductRepository} from './product.repository';
import {UserRepository} from './user.repository';

export class CartRepository extends SequelizeCrudRepository<
  Cart,
  typeof Cart.prototype.id,
  CartRelations
> {
  public readonly user: BelongsToAccessor<
    User,
    typeof Cart.prototype.id
  >;

  public readonly product: BelongsToAccessor<
    Product,
    typeof Cart.prototype.id
  >;

  constructor(
    @inject('datasources.urbanTrendsDB')
    dataSource: UrbanTrendsDbDataSource,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
    @repository.getter('ProductRepository')
    protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Cart, dataSource);

    this.product = this.createBelongsToAccessorFor(
      'product',
      productRepositoryGetter,
    );
    this.registerInclusionResolver(
      'product',
      this.product.inclusionResolver,
    );

    this.user = this.createBelongsToAccessorFor(
      'user',
      userRepositoryGetter,
    );
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
