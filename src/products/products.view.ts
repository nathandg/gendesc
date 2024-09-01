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
      this.generateButton = document.getElementById('generate-button') as HTMLButtonElement;

      if (!this.username ||!this.logoutButton || !this.aiForm || !this.fileInput || !this.imgPreview || !this.lottieContainer || !this.titleInput || !this.descriptionInput || !this.generateButton) {
        throw new Error('home.html elements not found');
      }

      this.username.innerText = this.controller.getUsername();
      this.logoutButton.addEventListener('click', () => {
        this.controller.logout();
      });
      this.aiForm.addEventListener('submit', this.handleFormSubmit.bind(this));
      this.fileInput.addEventListener('change', this.handleFileInputChange.bind(this));
      this.controller.populateProducts();
      this.generateButton.addEventListener('click', () => {
        // this.controller.mockedCreateProduct();
      });
    }
  }

  private async handleFormSubmit(event: Event) {
    event.preventDefault();
  
    const formData = new FormData(this.aiForm);
    const file = formData.get('file-input') as File;
    const formTitle = formData.get('title-input') as string;
    const formDescription = formData.get('description-input') as string;
  
    const { title, description } = await this.controller.generateDetails(file, formTitle, formDescription);
  
    if (title) {
      this.titleInput.value = title;
    }
  
    if (description) {
      this.descriptionInput.value = description;
    }
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

  renderProducts(products: Product[]) {
    products.forEach((product) => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';

      const img = document.createElement('img');
      img.src = product.getImg();

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
