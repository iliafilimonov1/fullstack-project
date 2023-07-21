import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel, UserDocument } from '../schemas/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userModel: typeof UserModel,
  ) {}

  async login(username: string, password: string): Promise<string | null> {
    if (username === 'admin' && password === '123') {
      // Если аутентификация прошла успешно, генерируем и возвращаем JWT токен
      const payload = { sub: 'admin', username: 'admin' };
      return this.jwtService.sign(payload);
    }
    return null;
  }

  async validateUserById(userId: string): Promise<UserDocument | null> {
    try {
      const user = await this.userModel.findById(userId).exec();
      return user || null;
    } catch (error) {
      console.error('Error while validating user:', error);
      return null;
    }
  }

  async generateToken(user: any) {
    // Генерация и возвращение JWT токена на основе данных пользователя
    // В данном примере используется метод sign из JwtService
    const payload = { sub: user.userId, username: user.username };
    return this.jwtService.sign(payload);
  }
}
