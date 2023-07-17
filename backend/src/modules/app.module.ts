import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsController } from 'src/controllers/students.controller';
import { StudentsService } from 'src/services/students.service';
import { StudentSchema } from 'src/schemas/student.model';
import { SpecializationSchema } from '../schemas/specialization.model';
import { config } from 'dotenv';
config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: 'Student', schema: StudentSchema },
      { name: 'Specialization', schema: SpecializationSchema },
    ]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class AppModule {}
