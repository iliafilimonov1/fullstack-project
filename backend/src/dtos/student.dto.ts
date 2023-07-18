import { Teacher } from './../schemas/teacher.model';
import { Course } from '../schemas/course.model';
import { UserDto } from './user.dto';

/**
 * DTO (Data Transfer Object) для студента.
 */
export class StudentDto extends UserDto {
  /**
   * Название специализации студента.
   * @type {string}
   */
  specializationName: string;

  /**
   * Номер группы студента.
   * @type {string}
   */
  groupNumber: string;

  /**
   * Преподаватели студента.
   * @type {Teacher[]}
   */
  teachers: Teacher[];

  /**
   * Курсы студента.
   * @type {Course[]}
   */
  courses: Course[];
}
