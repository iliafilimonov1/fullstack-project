import { Course } from '../schemas/course.model';
import { UserDto } from './user.dto';

/**
 * DTO (Data Transfer Object) для преподавателя.
 */
export class TeacherDto extends UserDto {
  /**
   * Название специализации преподавателя.
   * @type {string}
   */
  specializationName: string;

  /**
   * Номер группы преподавателя.
   * @type {string}
   */
  groupNumber: string;

  /**
   * Курсы, которые ведет преподаватель.
   * @type {Course[]}
   */
  courses: Course[];
}
