import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, JwtPayloadWithRt } from '../types';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  /**
   * @param {ConfigService} config - Сервис конфигурации для получения секретного ключа JWT.
   */
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET_KEY'),
      passReqToCallback: true,
    });
  }

  /**
   * Метод для валидации JWT токена и извлечения refresh token из заголовка запроса.
   * @param {Request} req - Объект запроса.
   * @param {JwtPayload} payload - Расшифрованные данные JWT токена (Payload).
   * @returns {JwtPayloadWithRt} - Объект с данными JWT Payload и дополнительным свойством refreshToken.
   * @throws {ForbiddenException} Если refresh token отсутствует или некорректен.
   */
  validate(req: Request, payload: JwtPayload): JwtPayloadWithRt {
    const refreshToken = req
      ?.get('authorization')
      ?.replace('Bearer', '')
      .trim();

    if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

    return {
      ...payload,
      refreshToken,
    };
  }
}
