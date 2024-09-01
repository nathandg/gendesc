import { AlertTypes } from '../../src/types/types';
import { Router } from '../../src/router';
import { Product } from './product';
import { ProductsController } from './products.controller';

export class ProductsView {
  private controller: ProductsController;
  private username: HTMLParagraphElement;
  private logoutButton: HTMLButtonElement;
  private productsDiv: HTMLDivElement;
  private aiForm: HTMLFormElement;
  private fileInput: HTMLInputElement;
  private titleInput: HTMLInputElement;
  private descriptionInput: HTMLInputElement;
  private imgPreview: HTMLImageElement;
  private lottieContainer: HTMLDivElement;
  private newProductButton: HTMLButtonElement;
  private activeEditProduct: Product | null;
  private generateButton: HTMLButtonElement;

  constructor() {
    Router.onRouteChange(this.handleRouteChange.bind(this));
  }

  setController(controller: ProductsController) {
    this.controller = controller;
  }

  private handleRouteChange(path: string) {
    if (path === '/home') {
      this.username = document.getElementById('username') as HTMLParagraphElement;
      this.logoutButton = document.getElementById('logout-button') as HTMLButtonElement;
      this.productsDiv = document.getElementById('products') as HTMLDivElement;
      this.aiForm = document.getElementById('ai-form') as HTMLFormElement;
      this.fileInput = document.getElementById('file-input') as HTMLInputElement;
      this.titleInput = document.getElementById('title-input') as HTMLInputElement;
      this.descriptionInput = document.getElementById('description-input') as HTMLInputElement;
      this.imgPreview = document.getElementById('img-preview') as HTMLImageElement;
      this.lottieContainer = document.getElementById('lottie') as HTMLDivElement;
      this.newProductButton = document.getElementById('new-product-button') as HTMLButtonElement;
      this.generateButton = document.getElementById('generate-button') as HTMLButtonElement;

      if (!this.username ||!this.logoutButton || !this.aiForm || !this.fileInput || !this.imgPreview || !this.lottieContainer || !this.titleInput || !this.descriptionInput || !this.newProductButton || !this.generateButton) {
        throw new Error('home.html elements not found');
      }

      this.username.innerText = this.controller.getUsername();
      this.logoutButton.addEventListener('click', () => {
        this.controller.logout();
      });
      this.aiForm.addEventListener('submit', this.handleFormSubmit.bind(this));
      this.fileInput.addEventListener('change', this.handleFileInputChange.bind(this));
      this.controller.loadProducts();
      this.newProductButton.addEventListener('click', () => {
        this.activeEditProduct = null;
        this.titleInput.value = '';
        this.descriptionInput.value = '';
        this.imgPreview.style.display = 'none';
        this.lottieContainer.style.display = 'block';
        this.fileInput.style.opacity = '1';
        this.fileInput.style.pointerEvents = 'auto';
      });
    }
  }

  private setButtonLoading(loading: boolean) {
    if (loading) {
      this.generateButton.disabled = true;
      this.generateButton.innerText = 'Gerando...';
    } else {
      this.generateButton.disabled = false;
      this.generateButton.innerText = 'Gerar';
    }
  }

  private async handleFormSubmit(event: Event) {
    event.preventDefault();

    this.setButtonLoading(true);
  
    const formData = new FormData(this.aiForm);
    const file = formData.get('file-input') as File;
    const formTitle = formData.get('title-input') as string;
    const formDescription = formData.get('description-input') as string;

    let response;
    if (this.activeEditProduct) {
      response = await this.controller.generateNewDetailsFromProduct(this.activeEditProduct, formTitle, formDescription);
    } else {
      response = await this.controller.generateDetails(file, formTitle, formDescription);
    }

    if (response.type === AlertTypes.Success) {
      this.titleInput.value = response.data.getTitle();
      this.descriptionInput.value = response.data.getDescription();
      this.controller.loadProducts();
      this.setProductInForm(response.data);
    } else {
      this.createAlert(response.type, response.message);
    }
    this.setButtonLoading(false);
  }

  private handleFileInputChange(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imgPreview.src = reader.result as string;
      this.imgPreview.style.display = 'block';
      this.lottieContainer.style.display = 'none';
    };

    reader.readAsDataURL(file);
  }

  private createAlert = (type: string, message: string) => {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerText = message;
    this.aiForm.insertBefore(alert, this.aiForm.firstChild);
    setTimeout(() => alert.remove(), 1500);
  };

  setProductInForm(product: Product) {
    this.titleInput.value = product.getTitle();
    this.descriptionInput.value = product.getDescription();
    this.imgPreview.src = `data:image/png;base64,${product.getImg()}`;
    this.imgPreview.style.display = 'block';
    this.fileInput.style.opacity = '0.5';
    this.fileInput.style.pointerEvents = 'none';
    this.lottieContainer.style.display = 'none';
    this.activeEditProduct = product;
  }

  renderProducts(products: Product[]) {
    this.productsDiv.innerHTML = '';
    products.forEach((product) => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      productDiv.onclick = () => this.setProductInForm(product);

      const img = document.createElement('img');
      img.src = `data:image/png;base64,${product.getImg()}`;

      productDiv.appendChild(img);

      const text = document.createElement('div');
      text.className = 'text';

      const title = document.createElement('p');
      title.className = 'text-body';
      title.innerText = product.getTitle();

      const description = document.createElement('p');
      description.className = 'text-body-secondary';
      description.innerText = product.getDescription();

      text.appendChild(title);
      text.appendChild(description);
      productDiv.appendChild(text);

      this.productsDiv.appendChild(productDiv);
    });
  }
}
