import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {UrbanTrendsDbDataSource} from '../datasources';
import {Product, ProductRelations, Cart} from '../models';
import {CartRepository} from './cart.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {

  public readonly carts: HasManyRepositoryFactory<Cart, typeof Product.prototype.id>;

  constructor(
    @inject('datasources.urbanTrendsDB') dataSource: UrbanTrendsDbDataSource, @repository.getter('CartRepository') protected cartRepositoryGetter: Getter<CartRepository>,
  ) {
    super(Product, dataSource);
    this.carts = this.createHasManyRepositoryFactoryFor('carts', cartRepositoryGetter,);
    this.registerInclusionResolver('carts', this.carts.inclusionResolver);
  }
}
