import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Course } from '../schemas/course.model';
import { User } from './user.model';
import { TeacherDto } from 'src/dtos/teacher.dto';

/**
 * Модель данных для преподавателя.
 */
@Schema()
export class Teacher extends User {
  save(): Teacher | PromiseLike<Teacher> {
    throw new Error('Method not implemented.');
  }
  /**
   * Конструктор класса Teacher.
   * @param {TeacherDto} userDto - dto преподавателя.
   */
  constructor(userDto: TeacherDto) {
    super(userDto);
  }

  /**
   * Специализация преподавателя.
   * @type {string}
   */
  @Prop()
  specializationName: string;

  /**
   * Курсы, которые ведет преподаватель.
   * @type {Course[]}
   */
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Course' }] })
  courses: Course[] = [];

  /**
   * Идентификаторы групп, которыми руководит преподаватель.
   * @type {string[]}
   */
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Group' }] })
  groupIds: string[];
}

/**
 * Схема для модели Teacher.
 * @type {import('mongoose').Schema<Teacher>}
 */
export const TeacherSchema = SchemaFactory.createForClass(Teacher);
