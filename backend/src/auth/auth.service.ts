import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { AuthDto } from './dto';
import { JwtPayload, Tokens } from './types';
import { Model } from 'mongoose';
import { UserDocument } from '../user/user.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * Регистрация нового пользователя.
   * @param dto - Объект данных для авторизации (username и password).
   * @returns Объект токенов (access_token и refresh_token).
   */
  async signupLocal(dto: AuthDto): Promise<Tokens> {
    const hash = await argon.hash(dto.password); // хеширование пароля

    const existingUser = await this.userModel.findOne({
      username: dto.username,
    });

    if (existingUser) {
      throw new ForbiddenException('Username already exists');
    }

    try {
      const user = await this.userModel.create({
        username: dto.username,
        password: hash,
      });

      console.log('user created in db:', user);

      const tokens = await this.generateTokens(user._id, user.username);

      await this.encryptAndSaveRtinDb(user._id, tokens.refresh_token); // хеширование refresh token

      return tokens;
    } catch (error) {
      console.error('Error occurred during signupLocal:', error);
    }
  }

  /**
   * Вход пользователя.
   * @param dto - Объект данных для авторизации (username и password).
   * @returns Объект токенов (access_token и refresh_token).
   */
  async signinLocal(dto: AuthDto): Promise<Tokens> {
    const user = await this.userModel.findOne({ username: dto.username });

    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    const passwordMatches = await argon.verify(user.password, dto.password); // верификация пароля

    if (!passwordMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.generateTokens(user._id, user.username);

    await this.encryptAndSaveRtinDb(user.id, tokens.refresh_token);

    return tokens;
  }

  /**
   * Выход пользователя из системы.
   * @param userId - id пользователя.
   * @returns boolean
   */
  async logout(userId: string): Promise<boolean> {
    await this.userModel.updateMany(
      { _id: userId, hashedRt: { $ne: null } },
      { $set: { hashedRt: null } },
    );
    return true;
  }

  /**
   * Обновление токенов пользователя.
   * @param userId - id пользователя.
   * @param rt - Refresh token пользователя.
   * @returns Объект с новыми токенами (access_token и refresh_token).
   */
  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const user = await this.userModel.findById(userId);

    if (!user || !user.hashedRt) {
      throw new ForbiddenException('Access Denied');
    }

    // Соответствие предоставленного refresh token хешу в бд
    const rtMatches = await argon.verify(user.hashedRt, rt);

    if (!rtMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.generateTokens(userId, user.username);

    await this.encryptAndSaveRtinDb(userId, tokens.refresh_token);

    return tokens;
  }

  /**
   * Хеширование и сохранение refresh token в базе данных.
   * @param userId - id пользователя.
   * @param rt - Refresh token пользователя.
   * @returns `Promise<void>`.
   */
  async encryptAndSaveRtinDb(userId: string, rt: string): Promise<void> {
    try {
      const hash = await argon.hash(rt);
      await this.userModel.findByIdAndUpdate(userId, { hashedRt: hash });
    } catch (error) {
      console.error('Error updating hashedRt:', error);
      throw error;
    }
  }

  /**
   * Генерация новых токенов для пользователя.
   * @param userId - id пользователя.
   * @param name - Имя пользователя.
   * @returns Объект с новыми токенами (access_token, refresh_token и access_token_expires).
   */
  async generateTokens(userId: string, name: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      name: name,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    // Срок действия access token 15 минут
    const accessTokenExpires = Date.now() + 15 * 60 * 1000;

    return {
      access_token: at,
      refresh_token: rt,
      access_token_expires: accessTokenExpires.toString(),
    };
  }
}
