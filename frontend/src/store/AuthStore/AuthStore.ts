import {
  observable, runInAction,
} from 'mobx';
import Cookies from 'js-cookie';
import axios from 'axios';
import BaseStore from '../BaseStore/BaseStore';
import AuthService from '@/services/AuthService';

/**
 * Класс AuthStore для управления состоянием аутентификации пользователя.
 */
class AuthStore extends BaseStore {
  @observable isAuthenticated = false;

  /**
   * Регистрация пользователя.
   * @param {string} username - Логин пользователя.
   * @param {string} password - Пароль пользователя.
   */

  async register(username: string, password: string): Promise<void> {
    await this.runWithStateControl(async () => {
      const tokens = await AuthService.register({ username, password });

      if (tokens) {
        Cookies.set('accessToken', tokens.access_token);
        Cookies.set('refreshToken', tokens.refresh_token);
        Cookies.set('accessTokenExpires', tokens.access_token_expires);

        runInAction(() => {
          this.isAuthenticated = true;
        });
      } else {
        console.error('Registration failed.');
      }
    });
  }

  /**
   * Вход пользователя в систему.
   * @param {string} username - Логин пользователя.
   * @param {string} password - Пароль пользователя.
   */

  async login(username: string, password: string) {
    await this.runWithStateControl(async () => {
      const tokens = await AuthService.login({ username, password });

      Cookies.set('accessToken', tokens.access_token);
      Cookies.set('refreshToken', tokens.refresh_token);
      Cookies.set('accessTokenExpires', tokens.access_token_expires);

      this.isAuthenticated = true;
    });
  }

  async checkAndRefreshTokens() {
    try {
      const refreshToken = Cookies.get('refreshToken');

      if (refreshToken) {
        const expirationTime = Cookies.get('accessTokenExpiresAt');

        if (expirationTime && Date.now() >= Number.parseInt(expirationTime, 10)) {
          const response = await axios.post('http://localhost:3000/auth/refresh', { rt: refreshToken });

          const tokens = response.data;

          if (tokens.isAuthenticated) {
            if (tokens.access_token && tokens.refresh_token && tokens.access_token_expires) {
              Cookies.set('accessToken', tokens.access_token, { httpOnly: true, secure: true });
              Cookies.set('refreshToken', tokens.refresh_token, { httpOnly: true, secure: true });
              Cookies.set('accessTokenExpires', tokens.access_token_expires);

              this.isAuthenticated = true;
            } else {
              throw new Error('Неверные данные токена, полученные с сервера.');
            }
          } else {
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            Cookies.remove('accessTokenExpires');
            this.isAuthenticated = false;
          }
        } else {
          this.isAuthenticated = true;
        }
      } else {
        this.isAuthenticated = false;
      }
    } catch (error) {
      console.error('Ошибка проверки статуса авторизации:', error);
      this.isAuthenticated = false;
    }
  }

  /**
   * Выход пользователя из системы.
   */
  async logout() {
    await this.runWithStateControl(async () => {
      await AuthService.logout();
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      Cookies.remove('accessTokenExpires');

      this.isAuthenticated = false;
    });
  }
}

export default AuthStore;
