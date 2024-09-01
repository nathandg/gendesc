export class Product {
  private title: string;
  private description: string;
  private img: string;

  constructor(title: string, description: string, img: string) {
    this.title = title;
    this.description = description;
    this.img = img;
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getImg() {
    return this.img;
  }
}
