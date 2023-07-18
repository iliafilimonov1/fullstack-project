import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from '../controllers/admin.controller';
import { AdminService } from '../services/admin.service';
import { Admin, AdminSchema } from '../schemas/admin.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Admin', schema: AdminSchema }]),
  ],
  controllers: [AdminController],
  providers: [AdminService, Admin],
})

export class AdminModule {}
