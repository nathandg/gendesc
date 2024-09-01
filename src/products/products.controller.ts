import { AuthModel } from '../../src/auth/auth.model';
import { GeminiModel } from '../../src/gemini/gemini.model';
import FirebaseModel from '../firebase/firebase.model';
import { ProductsModel } from './products.model';
import { ProductsView } from './products.view';

export class ProductsController {
  private productsModel: ProductsModel;
  private productsView: ProductsView;
  private geminiModel: GeminiModel;
  
  constructor(productsModel: ProductsModel, productsView: ProductsView, geminiModel: GeminiModel) {
    this.productsModel = productsModel;
    this.productsView = productsView;
    this.geminiModel = geminiModel;
    this.productsView.setController(this);
  }
  
  async logout() {
    await AuthModel.logout();
  }
  
  async generateDetails(file: File, title: string, description: string) {
    if (!file.name) {
      return alert('Please select an image');
    }
    return await this.geminiModel.generateDescriptions(file, title, description);
  }
  
  async populateProducts() {
    const products = await this.productsModel.getProducts();
    this.productsView.renderProducts(products);
  }

  getUsername(): string {
    const user = FirebaseModel.getInstance().getUser();
    return user.email.split('@')[0];
  }
}
