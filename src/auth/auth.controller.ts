import { AuthModel } from './auth.model';
import { AuthView } from './auth.view';

export class AuthController {
  private model: AuthModel;
  private view: AuthView;

  constructor(model: AuthModel, view: AuthView) {
    this.model = model;
    this.view = view;
  }
}
