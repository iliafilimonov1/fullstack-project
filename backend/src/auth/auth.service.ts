import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { AuthDto } from './dto';
import { JwtPayload, Tokens } from './types';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/user.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async signupLocal(dto: AuthDto): Promise<Tokens> {
    console.log('Received data in signupLocal:', dto);

    const hash = await argon.hash(dto.password);

    // Проверяем, существует ли уже пользователь с таким именем (username)
    const existingUser = await this.userModel.findOne({
      username: dto.username,
    });
    if (existingUser) {
      throw new ForbiddenException('Username already exists');
    }

    try {
      const user = await this.userModel.create({
        username: dto.username,
        password: hash, // хеширование перед сохранением в бд
      });

      console.log('New user created:', user);

      const tokens = await this.getTokens(user._id.toString(), user.username);
      await this.updateRtHash(user._id.toString(), tokens.refresh_token);

      console.log('Tokens generated:', tokens);

      return tokens;
    } catch (error) {
      console.error('Error occurred during signupLocal:', error);

      if (error.code === 11000) {
        throw new ForbiddenException('Credentials incorrect');
      }
      throw error;
    }
  }

  async signinLocal(dto: AuthDto): Promise<Tokens> {
    const user = await this.userModel.findOne({ username: dto.username });

    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    const passwordMatches = await argon.verify(user.password, dto.password);
    if (!passwordMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user._id.toString(), user.username);
    console.log('Tokens:', tokens);
    await this.updateRtHash(user._id.toString(), tokens.refresh_token);

    return tokens;
  }

  async logout(userId: string): Promise<boolean> {
    await this.userModel.updateMany(
      { _id: userId, hashedRt: { $ne: null } },
      { $set: { hashedRt: null } },
    );
    return true;
  }

  async getCurrentUser(authToken: string): Promise<User | null> {
    try {
      console.log('Received token:', authToken);
      // Разбираем токен аутентификации для получения данных о пользователе
      const decodedToken = this.jwtService.decode(authToken);
      console.log('Decoded token:', decodedToken);
      if (!decodedToken || typeof decodedToken === 'string') {
        throw new ForbiddenException('Invalid token');
      }

      // Предполагая, что поле 'sub' в токене содержит идентификатор пользователя
      const userId = decodedToken.sub;

      // Ищем пользователя по идентификатору в базе данных
      const user = await this.userModel.findById(userId);
      console.log('User from database:', user);
      return user ? user.toObject() : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const user = await this.userModel.findById(userId);
    if (!user || !user.hashedRt) {
      throw new ForbiddenException('Access Denied');
    }

    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user._id.toString(), user.username);
    await this.updateRtHash(user._id.toString(), tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.userModel.findByIdAndUpdate(userId, { hashedRt: hash });
  }

  async getTokens(userId: string, name: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: +userId,
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

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
