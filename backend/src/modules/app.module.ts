import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from 'src/controllers/users.controller';
import { UsersService } from 'src/services/users.service';
import { UserSchema } from 'src/schemas/user.model';
import { StudentSchema } from 'src/schemas/student.model';
import { TeacherSchema } from 'src/schemas/teacher.model';
import { SpecializationSchema } from '../schemas/specialization.model';
import { config } from 'dotenv';
import { AdminModule } from './admin.module';

config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema, collection: 'users' },
      { name: 'Student', schema: StudentSchema, collection: 'students' },
      { name: 'Teacher', schema: TeacherSchema, collection: 'teachers' },
      { name: 'Specialization', schema: SpecializationSchema, collection: 'specializations' },
    ]),
    AdminModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})

export class AppModule {}
