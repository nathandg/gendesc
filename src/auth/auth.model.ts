import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import FirebaseService from '../../src/firebase/firebase.service';

export class AuthModel {
  private firebaseService: FirebaseService;

  constructor() {
    this.firebaseService = FirebaseService.getInstance();
  }

  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.firebaseService.getAuth(), email, password);
  }

  async register(email: string, password: string) {
    return await createUserWithEmailAndPassword(this.firebaseService.getAuth(), email, password);
  }

  static async logout() {
    await FirebaseService.getInstance().getAuth().signOut();
  }
}
