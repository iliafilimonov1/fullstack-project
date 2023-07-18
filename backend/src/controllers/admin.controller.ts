import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { TeacherDto } from '../dtos/teacher.dto';
import { ManagerDto } from '../dtos/manager.dto';
import { Teacher } from '../schemas/teacher.model';
import { Manager } from '../schemas/manager.model';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /**
   * Создание преподавателя.
   * @param {TeacherDto} teacherDto - dto преподавателя.
   * @returns {Promise<Teacher>} - Новый преподаватель.
   */
  @Post('teachers')
  async createTeacher(@Body() teacherDto: TeacherDto): Promise<Teacher> {
    return this.adminService.createTeacher(teacherDto);
  }

  /**
   * Создать менеджера.
   * @param {ManagerDto} managerDto - dto менеджера.
   * @returns {Promise<Manager>} - Новый менеджер.
   */
  @Post('managers')
  async createManager(@Body() managerDto: ManagerDto): Promise<Manager> {
    return this.adminService.createManager(managerDto);
  }
}
