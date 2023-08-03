/**
 * Тип данных для токенов.
 * - access_token: строка, содержащая access token.
 * - refresh_token: строка, содержащая refresh token.
 * - access_token_expires: строка, содержащая время истечения access token.
 */

export type Tokens = {
  access_token: string;
  refresh_token: string;
  access_token_expires: string;
};
