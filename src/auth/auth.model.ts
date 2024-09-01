import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import FirebaseModel from '../firebase/firebase.model';

export class AuthModel {
  private firebaseService: FirebaseModel;

  constructor() {
    this.firebaseService = FirebaseModel.getInstance();
  }

  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.firebaseService.getAuth(), email, password);
  }

  async register(email: string, password: string) {
    return await createUserWithEmailAndPassword(this.firebaseService.getAuth(), email, password);
  }

  static async logout() {
    await FirebaseModel.getInstance().getAuth().signOut();
  }
}
