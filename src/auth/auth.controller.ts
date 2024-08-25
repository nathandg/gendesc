import { AuthModel } from './auth.model';
import { AuthView } from './auth.view';

export class AuthController {
  private model: AuthModel;
  private view: AuthView;

  constructor(model: AuthModel, view: AuthView) {
    this.model = model;
    this.view = view;
    this.view.setController(this);
  }

  login = async (username: string, password: string) => {
    if (!username || !password) {
      return { type: 'danger', message: 'Usuário e senha são obrigatórios' };
    }

    if (username !== 'admin' || password !== 'admin') {
      return { type: 'danger', message: 'Usuário ou senha inválidos' };
    }

    return { type: 'success', message: 'Login efetuado com sucesso' };
  };
}
