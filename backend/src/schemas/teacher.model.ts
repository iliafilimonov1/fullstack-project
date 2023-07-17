import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.model';
import { Document, Types } from 'mongoose';
import { Course } from './course.model';

@Schema()
export class Teacher extends User {
  /**
   * Специализация преподавателя.
   */
  @Prop({ type: Types.ObjectId, ref: 'Specialization' })
  specializationId: string;

  /**
   * Курсы, которые ведет преподаватель.
   */
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Course' }] })
  courses: Course[];
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
