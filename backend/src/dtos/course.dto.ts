import { Teacher } from '../schemas/teacher.model';
import { Student } from '../schemas/student.model';

/**
 * DTO (Data Transfer Object) для курса.
 */
export class CourseDto {
  /**
   * Название курса.
   * @type {string}
   */
  name: string;

  /**
   * Преподаватель курса.
   * @type {Teacher}
   */
  teacher: Teacher;

  /**
   * Максимальное количество студентов на курсе.
   * @type {number}
   */
  maxStudents: number;

  /**
   * Продолжительность курса в неделях.
   * @type {number}
   */
  durationWeeks: number;

  /**
   * Дата начала курса.
   * @type {Date}
   */
  startDate: Date;

  /**
   * Студенты, зарегистрированные на курсе.
   * @type {Student[]}
   */
  students: Student[];

  /**
   * Описание курса.
   * @type {string}
   */
  description: string;
}
