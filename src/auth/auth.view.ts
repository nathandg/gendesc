import { AlertTypes } from '../../src/utils/types';
import { Router } from '../../src/router';
import { AuthController } from './auth.controller';
import './index.css';

export class AuthView {
  private controller: AuthController;
  private loginForm: HTMLFormElement;
  private loginButton: HTMLButtonElement;
  private signupLink: HTMLAnchorElement;
  private registerForm: HTMLFormElement;
  private registerButton: HTMLButtonElement;
  private loginLink: HTMLAnchorElement;

  constructor() {
    Router.onRouteChange(this.handleRouteChange.bind(this));
    this.handleRouteChange('/login');
  }

  setController(controller: AuthController) {
    this.controller = controller;
  }

  private handleRouteChange(path: string) {
    if (path === '/login') {
      this.retrieveElementsFromLogin();
    } else if (path === '/register') {
      this.retrieveElementsFromRegister();
    }
  }

  private retrieveElementsFromLogin() {
    // Login html
    this.loginForm = document.getElementById('login-form') as HTMLFormElement;
    this.loginButton = document.getElementById('login-button') as HTMLButtonElement;
    this.signupLink = document.getElementById('signup-button') as HTMLAnchorElement;
    if (!this.loginForm || !this.loginButton || !this.signupLink) {
      throw new Error('login.html elements not found');
    }

    this.signupLink.addEventListener('click', this.handleRedirectToSignUp);
    this.loginForm.addEventListener('submit', this.loginSubmitHandler);
  }

  private retrieveElementsFromRegister = () => {
    console.log('register');
    // Register html
    this.registerForm = document.getElementById('register-form') as HTMLFormElement;
    this.registerButton = document.getElementById('register-button') as HTMLButtonElement;
    this.loginLink = document.getElementById('login-link') as HTMLAnchorElement;
    if (!this.registerForm || !this.registerButton || !this.loginLink) {
      throw new Error('register.html elements not found');
    }

    this.loginLink.addEventListener('click', this.handleRedirectToLogin);
    this.registerForm.addEventListener('submit', this.registerSubmitHandler);     
  };

  private loginSubmitHandler = async (event: Event) => {
    event.preventDefault();
    const formData = new FormData(this.loginForm);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      const response = await this.controller.login(username, password);
      this.createAlert(response.type, response.message, this.loginForm);
    } catch (error) {
      this.createAlert(AlertTypes.Danger, error.message, this.loginForm);
    }
    this.loginForm.reset();
  };

  private registerSubmitHandler = async (event: Event) => {
    event.preventDefault();
    const formData = new FormData(this.registerForm);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm-password') as string;

    try {
      const response = await this.controller.register(username, password, confirmPassword);
      this.createAlert(response.type, response.message, this.registerForm);
    } catch (error) {
      this.createAlert(AlertTypes.Danger, error.message, this.registerForm);
    }
    this.registerForm.reset();
  };

  private createAlert = (type: string, message: string, form: HTMLFormElement) => {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerText = message;
    form.insertBefore(alert, form.firstChild);
    setTimeout(() => alert.remove(), 1500);
  };

  private handleRedirectToSignUp() {
    Router.navigate('/register');
  }

  private handleRedirectToLogin() {
    Router.navigate('/login');
  }
  
}
