import { JwtPayload } from '.';

/**
 * Тип данных для JWT Payload.
 * Расширяет тип JwtPayload и добавляет свойство refreshToken.
 */
export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };
