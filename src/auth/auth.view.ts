import { Router } from '../../src/router';
import './index.css';

export class AuthView {
  private loginForm: HTMLFormElement;
  private loginButton: HTMLButtonElement;
  private signupBtn: HTMLButtonElement;

  constructor() {
      this.loginForm = document.getElementById('login-form') as HTMLFormElement;
      this.loginButton = document.getElementById('login-button') as HTMLButtonElement;
      this.signupBtn = document.getElementById('signup-button') as HTMLButtonElement;
  
      this.signupBtn.addEventListener('click', this.handleRedirectToSignUp);
  }

  handleRedirectToSignUp() {
    console.log('Redirecting to sign up page');
    Router.navigate('/register');
  }
  
}
