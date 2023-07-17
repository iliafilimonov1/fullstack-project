import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsController } from 'src/controllers/students.controller';
import { StudentsService } from 'src/services/students.service';
import { UserSchema } from 'src/schemas/user.model';
import { StudentSchema } from 'src/schemas/student.model';
import { ManagerSchema } from 'src/schemas/manager.model';
import { TeacherSchema } from 'src/schemas/teacher.model';
import { SpecializationSchema } from '../schemas/specialization.model';
import { config } from 'dotenv';
config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema, collection: 'users' },
      { name: 'Student', schema: StudentSchema, collection: 'students' },
      { name: 'Manager', schema: ManagerSchema, collection: 'managers' },
      { name: 'Teacher', schema: TeacherSchema, collection: 'teachers' },
      { name: 'Specialization', schema: SpecializationSchema, collection: 'specializations' },
    ]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class AppModule {}
