export class Product {
  private title: string;
  private description: string;
  private img: string;
  private id?: string;

  constructor(title: string, description: string, img: string, id?: string) {
    this.title = title;
    this.description = description;
    this.img = img;
    this.id = id;
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

  getId() {
    return this.id;
  }
}
