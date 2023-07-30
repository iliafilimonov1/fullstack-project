import Cookies from "js-cookie";
import { useEffect, useState } from "react";

/**
 * Хук для управления аутентификацией пользователя.
 *
 * @returns {Object} Объект с данными аутентификации и методами для ее управления.
 */
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const accessTokenFromCookies = Cookies.get('accessToken');

  /**
   * Проверяет, есть ли у пользователя валидный accessToken в куки при монтировании компонента.
   */
  useEffect(() => {
    setIsAuthenticated(!!accessTokenFromCookies);
  }, [accessTokenFromCookies]);

  /**
   * Выход пользователя из системы.
   * Удаляет accessToken и refreshToken из куки и перенаправляет на страницу входа.
   */
  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');

    setIsAuthenticated(false);
  };

  return { isAuthenticated, logout };
};
