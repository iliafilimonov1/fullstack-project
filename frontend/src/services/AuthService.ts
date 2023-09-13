import Cookies from 'js-cookie';
import { ApiConnection } from './api';
import { AuthDto, Tokens } from './types';

/** Статитчный класс чисто для запросов */
class AuthService {
  static get RootPath() {
    return '/auth';
  }

  static async login(request: AuthDto) {
    const response = await ApiConnection.post<Tokens>(`${this.RootPath}/local/signin`, request);
    return response.data;
  }

  static async register(request: AuthDto) {
    const response = await ApiConnection.post<Tokens>(`${this.RootPath}/local/signup`, request);
    return response.data;
  }

  static async logout() {
    await ApiConnection.post(`${this.RootPath}/logout`, null, {
      headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
    });
  }
}

export default AuthService;
