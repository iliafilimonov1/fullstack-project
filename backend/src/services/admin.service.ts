import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher } from '../schemas/teacher.model';
import { TeacherDto } from '../dtos/teacher.dto';
import { Manager } from '../schemas/manager.model';
import { ManagerDto } from '../dtos/manager.dto';
import { AdminDto } from '../dtos/admin.dto';
import { Admin } from '../schemas/admin.model';
import bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {}

  async login(adminDto: AdminDto): Promise<string> {
    const { username, password } = adminDto;

    const admin = await this.adminModel.findOne({ username }).exec();
    if (!admin) {
      throw new Error('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    return 'Login successful';
  }

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
