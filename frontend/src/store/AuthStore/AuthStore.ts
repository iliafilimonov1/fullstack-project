import { makeObservable, observable, action } from "mobx";
import Cookies from "js-cookie";
import axios from "axios";

/**
 * Интерфейс для токенов доступа и обновления.
 */
interface Tokens {
  access_token: string;
  refresh_token: string;
}

/**
 * Интерфейс для передачи данных аутентификации.
 */
interface AuthDto {
  username: string;
  password: string;
}

/**
 * Класс AuthStore для управления состоянием аутентификации пользователя.
 */
class AuthStore {
  @observable isAuthenticated = false;

  constructor() {
    try {
      makeObservable(this);
    } catch (error) {
      console.warn(error);
    }
  }

  /**
   * Регистрация пользователя.
   * @param {string} username - Логин пользователя.
   * @param {string} password - Пароль пользователя.
   */
  @action
  async register(username: string, password: string) {
    try {
      const dto: AuthDto = { username, password };
      const response = await axios.post<Tokens>(
        "http://localhost:3000/auth/local/signup",
        dto
      );
      const tokens = response.data;

      Cookies.set("accessToken", tokens.access_token);
      Cookies.set("refreshToken", tokens.refresh_token);

      this.isAuthenticated = true;
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  /**
   * Вход пользователя в систему.
   * @param {string} username - Логин пользователя.
   * @param {string} password - Пароль пользователя.
   */
  @action
  async login(username: string, password: string) {
    try {
      const dto: AuthDto = { username, password };
      const response = await axios.post<Tokens>(
        "http://localhost:3000/auth/local/signin",
        dto
      );
      const tokens = response.data;

      Cookies.set("accessToken", tokens.access_token);
      Cookies.set("refreshToken", tokens.refresh_token);

      this.isAuthenticated = true;
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  /**
   * Выход пользователя из системы.
   */
  @action
  logout() {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    this.isAuthenticated = false;
  }
}

const authStore = new AuthStore();
export default authStore;
