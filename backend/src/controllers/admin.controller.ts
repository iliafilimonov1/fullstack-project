import { Controller, Post, Body, Logger } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { TeacherDto } from '../dtos/teacher.dto';
import { ManagerDto } from '../dtos/manager.dto';
import { Teacher } from '../schemas/teacher.model';
import { Manager } from '../schemas/manager.model';
import { AdminDto } from '../dtos/admin.dto';

@Controller('admin')
export class AdminController {
  private readonly logger = new Logger(AdminController.name);

  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  async login(@Body() adminLoginDto: AdminDto) {
    try {
      const loginResult = await this.adminService.login(adminLoginDto);

      if (loginResult === 'Login successful') {
        return { message: 'Login successful' };
      } else {
        return { message: 'Invalid credentials' };
      }
    } catch (error) {
      this.logger.error(`An error occurred during login: ${error.message}`);
      throw error;
    }
  }

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
