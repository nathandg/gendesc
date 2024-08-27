import { Analytics, getAnalytics } from 'firebase/analytics';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth';
import { firebaseConfig } from './firebase.credentials';

class FirebaseService {
  private static instance: FirebaseService;
  private app: FirebaseApp;
  private analytics: Analytics;
  private auth: Auth;

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  async initializeFirebase() {
    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
    this.analytics = getAnalytics(this.app);
    this.auth = getAuth(this.app);
    setPersistence(this.auth, browserLocalPersistence);
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

}

export default FirebaseService;
