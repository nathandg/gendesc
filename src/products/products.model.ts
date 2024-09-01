import { addDoc, collection, Firestore, getDocs, query } from 'firebase/firestore';
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
      return new Product(data.title, data.description, data.img);
    });
    
    return products;
  }  

  async createProduct(product: Product) {
    const user = FirebaseModel.getInstance().getUser();

    const userId = user.uid;
    const productsCollectionRef = collection(this.firestore, `users/${userId}/products`);
    await addDoc(productsCollectionRef, product);
  }
  
}
