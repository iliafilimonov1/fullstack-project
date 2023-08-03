import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  /**
   * @param {ConfigService} config - Сервис конфигурации для получения секретного ключа JWT.
   */
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET_KEY'),
    });
  }

  /**
   * Метод для валидации JWT токена и возврата расшифрованных данных (Payload).
   * @param {JwtPayload} payload - Расшифрованные данные JWT токена (Payload).
   * @returns {JwtPayload} - Расшифрованные данные JWT токена.
   */
  validate(payload: JwtPayload) {
    return payload;
  }
}
