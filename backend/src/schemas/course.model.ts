import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Teacher } from './teacher.model';
import { Student } from './student.model';

@Schema()
export class Course extends Document {
  /**
   * Название курса.
   */
  @Prop({ required: true })
  name: string;

  /**
   * Преподаватель, ведущий курс.
   */
  @Prop({ type: Types.ObjectId, ref: 'Teacher' })
  teacher: Teacher;

  /**
   * Максимальное количество студентов, которые могут быть зарегистрированы на курс.
   */
  @Prop({ required: true })
  maxStudents: number;

  /**
   * Длительность курса в неделях.
   */
  @Prop({ required: true })
  durationWeeks: number;

  /**
   * Дата начала курса.
   */
  @Prop({ required: true })
  startDate: Date;

  /**
   * Список зарегистрированных студентов на курсе.
   */
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Student' }] })
  students: Student[];

  /**
   * Описание курса.
   */
  @Prop()
  description: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
