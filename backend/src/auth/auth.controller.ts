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
import { JwtPayloadWithRt, Tokens } from './types';
import { GetRefreshToken } from 'src/common/decorators/get-refresh-token';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number): Promise<boolean> {
    return this.authService.logout(userId.toString());
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetRefreshToken() refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId.toString(), refreshToken);
  }

  // Метод, использующий GetCurrentUser для получения всего пользователя
  @Post('me')
  @HttpCode(HttpStatus.OK)
  getMe(@GetCurrentUser() user: JwtPayloadWithRt): JwtPayloadWithRt {
    return user;
  }
}
