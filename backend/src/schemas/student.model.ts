import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.model';
import { Document, Types } from 'mongoose';
import { Course } from './course.model';
import { Teacher } from './teacher.model';
import { StudentDto } from '../dtos/student.dto';

@Schema()
export class Student extends User {
  /**
   * Конструктор класса Student.
   * @param {StudentDto} userDto - dto студента.
   */
  constructor(userDto: StudentDto) {
    super(userDto);
  }

  /**
   * Название специализации студента.
   * @type {string}
   */
  @Prop()
  specializationName: string;

  /**
   * Номер группы студента.
   * @type {string}
   */
  @Prop()
  groupNumber: string;

  /**
   * Преподаватели студента.
   * @type {Teacher[]}
   */
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Teacher' }] })
  teachers: Teacher[];

  /**
   * Курсы, на которые записан студент.
   * @type {Course[]}
   */
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Course' }] })
  courses: Course[] = [];
}

/**
 * Схема для модели Student.
 * @type {import('mongoose').Schema<Student>}
 */
export const StudentSchema = SchemaFactory.createForClass(Student);
