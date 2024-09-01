import { Analytics, getAnalytics } from 'firebase/analytics';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { Auth, browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth';
import { firebaseConfig } from './firebase.credentials';
import { Router } from '../router';

class FirebaseModel {
  private static instance: FirebaseModel;
  private app: FirebaseApp;
  private analytics: Analytics;
  private auth: Auth;
  private firestore: Firestore;

  public static getInstance(): FirebaseModel {
    if (!FirebaseModel.instance) {
      FirebaseModel.instance = new FirebaseModel();
    }
    return FirebaseModel.instance;
  }

  async initializeFirebase() {
    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
    this.analytics = getAnalytics(this.app);
    this.auth = getAuth(this.app);
    setPersistence(this.auth, browserLocalPersistence);
    this.firestore = getFirestore(this.app);
  }

  public getApp() {
    return this.app;
  }

  public getAnalytics() {
    return this.analytics;
  }

  public getAuth() {
    return this.auth;
  }

  public getFirestore() {
    return this.firestore;
  }

  public getUser() {
    const user = this.auth.currentUser;
    if (!user) {
      Router.navigate('/login');
      throw new Error('User not found');
    }
    return user;
  }

}

export default FirebaseModel;
