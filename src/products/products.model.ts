import { addDoc, collection, doc, Firestore, getDocs, query, updateDoc } from 'firebase/firestore';
import FirebaseModel from '../firebase/firebase.model';
import { Product } from './product';

export class ProductsModel {
  private firestore: Firestore;

  constructor() {
    this.firestore = FirebaseModel.getInstance().getFirestore();
  }

  async getProducts(): Promise<Product[]> {
    const user = JSON.parse(localStorage.getItem('user'));
    const path = `users/${user.uid}/products`;
    const productsQuery = query(collection(this.firestore, path));
    const productsSnapshot = await getDocs(productsQuery);
  
    const products = productsSnapshot.docs.map(doc => {
      const data = doc.data();
      return new Product(data.title, data.description, data.img, doc.id);
    });
    
    return products;
  }  

  async createProduct(product: Product) {
    console.log('Creating product', product);
    const user = FirebaseModel.getInstance().getUser();

    const userId = user.uid;
    const productsCollectionRef = collection(this.firestore, `users/${userId}/products`);
    await addDoc(productsCollectionRef, {
      title: product.getTitle(),
      description: product.getDescription(),
      img: product.getImg(),
    });
  }
  
  async updateProduct(productId: string, updatedProduct: Product) {
    console.log('Updating product', productId, updatedProduct);
    const user = FirebaseModel.getInstance().getUser();

    const userId = user.uid;
    const productDocRef = doc(this.firestore, `users/${userId}/products`, productId);
    await updateDoc(productDocRef, {
      title: updatedProduct.getTitle(),
      description: updatedProduct.getDescription(),
      img: updatedProduct.getImg(),
    });
  }
  
}
