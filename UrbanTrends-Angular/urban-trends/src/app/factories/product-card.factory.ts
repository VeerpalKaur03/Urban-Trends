import { Product } from '../models/product.model';

export class ProductCardFactory {
  static createCard(product: Product) {
    switch (product.category.toLowerCase()) {
      case 'men':
        return { badge: '👕 For Him', color: 'border-blue-400' };
      case 'women':
        return { badge: '👗 For Her', color: 'border-pink-400' };
      case 'kids':
        return { badge: '🧸 For Kids', color: 'border-yellow-400' };
      default:
        return { badge: '✨ Collection', color: 'border-gray-300' };
    }
  }
}
