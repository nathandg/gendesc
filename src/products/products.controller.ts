import { ProductsModel } from './products.model';
import { ProductsView } from './products.view';

export class ProductsController {
  private productsModel: ProductsModel;
  private productsView: ProductsView;

  constructor(productsModel: ProductsModel, productsView: ProductsView) {
    this.productsModel = productsModel;
    this.productsView = productsView;
    this.productsView.setController(this);
  }

  generateDetails(file: File, formTitle: string, formDescription: string) {
    console.log('Generating details', file, formTitle, formDescription);
    return {title: 'title', description: 'description'};
  }

  populateProducts() {
    const products = this.productsModel.getMockedProducts();
    this.productsView.renderProducts(products);
  }
}
