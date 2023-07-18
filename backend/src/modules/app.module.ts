import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { UserSchema } from '../schemas/user.model';
import { StudentSchema } from '../schemas/student.model';
import { TeacherSchema } from '../schemas/teacher.model';
import { SpecializationSchema } from '../schemas/specialization.model';
import { config } from 'dotenv';
import { AdminModule } from '../modules/admin.module';
import { HttpModule } from '@nestjs/axios';

config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema, collection: 'users' },
      { name: 'Student', schema: StudentSchema, collection: 'students' },
      { name: 'Teacher', schema: TeacherSchema, collection: 'teachers' },
      {
        name: 'Specialization',
        schema: SpecializationSchema,
        collection: 'specializations',
      },
    ]),
    HttpModule,
    AdminModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})

export class AppModule {}
