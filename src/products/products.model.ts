import { Product } from '../../src/types/types';

export class ProductsModel {
  private products: Product[] = [];

  getMockedProducts(): Product[] {
    return [
      {
        title: 'Product 1',
        description: 'Product 1 description',
        img: 'https://via.placeholder.com/150',
      },
      {
        title: 'Product 2',
        description: 'Product 2 description',
        img: 'https://via.placeholder.com/150',
      },
      {
        title: 'Product 3',
        description: 'Product 3 description',
        img: 'https://via.placeholder.com/150',
      },
    ];
  }
}
