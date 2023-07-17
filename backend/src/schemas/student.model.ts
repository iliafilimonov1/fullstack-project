import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.model';
import { Teacher } from './teacher.model';
import { Course } from './course.model';
import { Types } from 'mongoose';

@Schema()
export class Student extends User {
  /**
   * id специализации, к которой относится студент.
   */
  @Prop({ type: Types.ObjectId, ref: 'Specialization' })
  specializationId: string;

  /**
   * Номер группы, в которой учится студент.
   */
  @Prop({ required: true })
  groupNumber: string;

  /**
   * Список преподавателей, преподающих студенту.
   */
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Teacher' }] })
  teachers: Teacher[];

  /**
   * Список курсов, которые посещает студент.
   */
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Course' }] })
  courses: Course[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
