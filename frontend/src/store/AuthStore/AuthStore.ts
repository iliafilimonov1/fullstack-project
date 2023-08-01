import { makeObservable, observable, action } from "mobx";
import Cookies from "js-cookie";
import axios from "axios";

/**
 * Интерфейс для токенов доступа и обновления.
 */
export interface Tokens {
  access_token: string;
  refresh_token: string;
}

/**
 * Интерфейс для передачи данных аутентификации.
 */
export interface AuthDto {
  username: string;
  password: string;
}

// перехватчик запросов для отладки
axios.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Класс AuthStore для управления состоянием аутентификации пользователя.
 */
class AuthStore {
  @observable isAuthenticated = false;

  constructor() {
    makeObservable(this);
  }

  // @action
  // async checkAuthStatus() {
  //   try {
  //     const refreshToken = Cookies.get("refreshToken");
  //     console.log("AuthStore-refreshtoken", refreshToken);
  //     const userId = Cookies.get("userId");
  //     console.log("AuthStore-user-id", userId);

  //     const response = await axios.post("http://localhost:3000/auth/refresh", {
  //       userId,
  //       rt: refreshToken,
  //     });
  //     console.log(response.data);

  //     if (response.data.isAuthenticated) {
  //       this.isAuthenticated = true;
  //     } else {
  //       this.isAuthenticated = false;
  //       Cookies.remove("accessToken");
  //     }
  //   } catch (error) {
  //     console.error("Error checking auth status:", error);
  //   }
  // }

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

      // После успешной регистрации, проверяем статус авторизации
      await this.checkAuthStatus();

      console.log("Tokens saved to cookies:", tokens);
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

      console.log(this.isAuthenticated);

      console.log("Tokens saved to cookies:", tokens);
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
