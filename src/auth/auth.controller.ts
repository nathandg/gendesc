import { Router } from '../../src/router';
import { AlertTypes } from '../../src/utils/types';
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
      return { type: AlertTypes.Warning, message: 'Usuário e senha são obrigatórios' };
    }

    if (username !== 'admin' || password !== 'admin') {
      return { type: AlertTypes.Danger, message: 'Usuário ou senha inválidos' };
    }

    Router.navigate('/home');
    return { type: AlertTypes.Success, message: 'Login efetuado com sucesso' };
  };

  register = async (username: string, password: string, confirmPassword: string) => {
    if (!username || !password || !confirmPassword) {
      return { type: AlertTypes.Warning, message: 'Preencha todos os campos' };
    }

    if (password !== confirmPassword) {
      return { type: AlertTypes.Info, message: 'Senhas não conferem' };
    }

    return { type: AlertTypes.Success, message: 'Usuário cadastrado com sucesso' };
  };
}
