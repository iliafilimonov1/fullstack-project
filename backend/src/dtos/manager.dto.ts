import { User } from '../schemas/user.model';
import { UserDto } from './user.dto';

/**
 * DTO (Data Transfer Object) для менеджера.
 */
export class ManagerDto extends UserDto {
  /**
   * Название отдела, которым руководит менеджер.
   * @type {string}
   */
  departmentName: string;

  /**
   * Должность менеджера.
   * @type {string}
   */
  position: string;

  /**
   * Подчиненные сотрудники менеджера.
   * @type {User[]}
   */
  subordinates: User[];
}
