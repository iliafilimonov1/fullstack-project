import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Public, GetCurrentUserId, GetCurrentUser } from '../common/decorators';
import { RtGuard } from '../common/guards';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Регистрация нового пользователя.
   * @param dto - Объект с данными для регистрации (username и password).
   * @returns Объект с токенами (access_token и refresh_token).
   */
  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }

  /**
   * Авторизация пользователя.
   * @param dto - Объект с данными для авторизации (username и password).
   * @returns Объект с токенами (access_token и refresh_token).
   */
  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  }

  /**
   * Выход текущего пользователя из системы.
   * @param userId - id пользователя.
   * @returns boolean
   */
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string): Promise<boolean> {
    return this.authService.logout(userId.toString());
  }

  /**
   * Обновление токенов пользователя по предоставленному refresh token.
   * @param userId - id пользователя.
   * @param refreshToken - Refresh token пользователя.
   * @returns Объект с новыми токенами (access_token и refresh_token).
   */
  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
