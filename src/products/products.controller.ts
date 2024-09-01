import { AlertTypes } from '../../src/types/types';
import { AuthModel } from '../../src/auth/auth.model';
import { GeminiModel } from '../../src/gemini/gemini.model';
import FirebaseModel from '../firebase/firebase.model';
import { ProductsModel } from './products.model';
import { ProductsView } from './products.view';
import { Product } from './product';

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
      return {type: AlertTypes.Warning, message: 'Selecione uma imagem'};
    }

    try {
      const generatedInfo =  await this.geminiModel.generateDescriptions(file, title, description);
      await this.productsModel.createProduct(generatedInfo);
      return {type: AlertTypes.Success, data: generatedInfo};
    } catch (error) {
      return {type: AlertTypes.Danger, message: error.message};
    }
  }

  async generateNewDetailsFromProduct(product: Product, title: string, description: string) {
     try {
        const generatedInfo = await this.geminiModel.generateNewDescriptions(product.getImg(), title, description);
        console.log('Generated info', generatedInfo);
        await this.productsModel.updateProduct(product.getId(), generatedInfo);
        return {type: AlertTypes.Success, data: generatedInfo};
     } catch (error) {
        return {type: AlertTypes.Danger, message: error.message};
     }
  }
  
  async loadProducts() {
    const products = await this.productsModel.getProducts();
    this.productsView.renderProducts(products);
  }

  getUsername(): string {
    const user = FirebaseModel.getInstance().getUser();
    return user.email.split('@')[0];
  }
}
