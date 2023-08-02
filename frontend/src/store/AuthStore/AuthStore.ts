import { makeObservable, observable, action } from "mobx";
import Cookies from "js-cookie";
import axios from "axios";

/**
 * Интерфейс для токенов доступа и обновления.
 */
export interface Tokens {
  access_token: string;
  refresh_token: string;
  access_token_expires_at: number;
}

/**
 * Интерфейс для передачи данных аутентификации.
 */
export interface AuthDto {
  username: string;
  password: string;
}

// // перехватчик запросов для отладки
// axios.interceptors.request.use(
//   (config) => {
//     const accessToken = Cookies.get("accessToken");
//     if (accessToken) {
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

/**
 * Класс AuthStore для управления состоянием аутентификации пользователя.
 */
class AuthStore {
  @observable isAuthenticated = false;

  constructor() {
    makeObservable(this);
    this.checkAndRefreshTokens();
  }

  @action
  async checkAndRefreshTokens() {
    try {
      const refreshToken = Cookies.get("refreshToken");
      console.log("AuthStore-refreshtoken", refreshToken);

      if (refreshToken) {
        // Проверяем, есть ли информация о времени истечения токена
        const expirationTime = Cookies.get("accessTokenExpiresAt");
        console.log(expirationTime);

        if (
          expirationTime &&
          Date.now() >= Number.parseInt(expirationTime, 10)
        ) {
          // Токен доступа истек, выполняем запрос на обновление токенов
          const response = await axios.post(
            "http://localhost:3000/auth/refresh",
            {
              rt: refreshToken,
            }
          );

          const tokens = response.data;

          if (tokens.isAuthenticated) {
            Cookies.set("accessToken", tokens.access_token);
            Cookies.set("refreshToken", tokens.refresh_token);
            Cookies.set(
              "accessTokenExpiresAt",
              tokens.access_token_expires_at.toString()
            );
            this.isAuthenticated = true;
          } else {
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            Cookies.remove("accessTokenExpiresAt");
            this.isAuthenticated = false;
          }
        } else {
          this.isAuthenticated = true;
        }
      } else {
        this.isAuthenticated = false;
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      this.isAuthenticated = false;
    }
  }

  /**
   * Регистрация пользователя.
   * @param {string} username - Логин пользователя.
   * @param {string} password - Пароль пользователя.
   */
  @action
  async register(username: string, password: string): Promise<void> {
    try {
      const dto: AuthDto = { username, password };
      await axios.post<void>("http://localhost:3000/auth/local/signup", dto);

      console.log("Registration successful!");
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
      Cookies.set(
        "accessTokenExpiresAt",
        tokens.access_token_expires_at.toString()
      );

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
  async logout() {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    this.isAuthenticated = false;
  }
}

const authStore = new AuthStore();
export default authStore;
