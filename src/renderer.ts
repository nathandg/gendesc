/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import { AuthController } from './auth/auth.controller';
import { AuthModel } from './auth/auth.model';
import { AuthView } from './auth/auth.view';

import './index.css';
import './auth/index.css';
import './products/index.css';

import { ProductsController } from './products/products.controller';
import { ProductsModel } from './products/products.model';
import { ProductsView } from './products/products.view';
import { Router } from './router';

console.log('👋 This message is being logged by "renderer.ts", included via Vite');

const initializeApp = async () => {
  
  await Router.addRoute('/notFound', 'notFound.html'),
  await Router.addRoute('/login', 'auth/login.html'),
  await Router.addRoute('/register', 'auth/register.html');
  await Router.addRoute('/home', 'products/home.html');

  Router.navigate('/login');
  new AuthController(new AuthModel(), new AuthView());
  new ProductsController(new ProductsModel(), new ProductsView());
};

initializeApp();
