import { Module } from '@nestjs/common';
import { AdminController } from '../controllers/admin.controller';
import { AdminService } from '../services/admin.service';

@Module({
  controllers: [AdminController], // Подключение контроллеров
  providers: [AdminService], // Подключение сервисов
})

export class AdminModule {}
