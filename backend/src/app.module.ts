import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from '../src/auth/auth.module';
import { AtGuard } from '../src/common/guards/at.guard';
import { config } from 'dotenv';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

config();

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },

  ],
})
export class AppModule {}
