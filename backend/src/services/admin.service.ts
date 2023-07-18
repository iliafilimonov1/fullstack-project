import { Injectable } from '@nestjs/common';
import { Teacher } from '../schemas/teacher.model';
import { TeacherDto } from '../dtos/teacher.dto';
import { Manager } from '../schemas/manager.model';
import { ManagerDto } from '../dtos/manager.dto';

@Injectable()
export class AdminService {
  /**
   * Создание преподавателя.
   * @param {TeacherDto} teacherDto - dto преподавателя.
   * @returns {Promise<Teacher>} - Новый преподаватель.
   */
  async createTeacher(teacherDto: TeacherDto): Promise<Teacher> {
    const teacher = new Teacher(teacherDto);
    return teacher.save();
  }

  /**
   * Создание менеджера.
   * @param {ManagerDto} managerDto - dto менеджера.
   * @returns {Promise<Manager>} - Новый менеджер.
   */
  async createManager(managerDto: ManagerDto): Promise<Manager> {
    const manager = new Manager(managerDto);
    return manager.save();
  }
}
