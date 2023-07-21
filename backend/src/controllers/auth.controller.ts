import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: any) {
    const { username, password } = credentials;

    // Вызываем метод login из AuthService для проверки учетных данных и получения токена
    const token = await this.authService.login(username, password);

    if (token) {
      return {
        message: 'Аутентификация прошла успешно!',
        token: token,
      };
    } else {
      return {
        message:
          'Неправильные учетные данные. Пожалуйста, проверьте логин и пароль.',
      };
    }
  }
}
