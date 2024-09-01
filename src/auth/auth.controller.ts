import { Router } from '../../src/router';
import { AlertTypes } from '../../src/types/types';
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

  login = async (email: string, password: string) => {
    if (!email || !password) {
      return { type: AlertTypes.Warning, message: 'Usuário e senha são obrigatórios' };
    }

    try {
      await this.model.login(email, password);
      Router.navigate('/home');
      return { type: AlertTypes.Success, message: 'Login efetuado com sucesso' };
    } catch (error) {
      return { type: AlertTypes.Danger, message: 'Usuário ou senha inválidos' };
    }
  };

  register = async (email: string, password: string, confirmPassword: string) => {
    if (!email || !password || !confirmPassword) {
      return { type: AlertTypes.Warning, message: 'Preencha todos os campos' };
    }

    if (password !== confirmPassword) {
      return { type: AlertTypes.Info, message: 'Senhas não conferem' };
    }

    try {
      await this.model.register(email, password);
      Router.navigate('/login');
      return { type: AlertTypes.Success, message: 'Usuário cadastrado com sucesso' };
    } catch (error) {
      return { type: AlertTypes.Danger, message: 'Erro ao cadastrar usuário' };
    }
  };
}
