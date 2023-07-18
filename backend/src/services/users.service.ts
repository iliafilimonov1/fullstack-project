import { Injectable } from '@nestjs/common';
import { User } from '../schemas/user.model';
import { UserDto } from '../dtos/user.dto';
import { UserI } from '../items/interfaces/user.interface';
import { Teacher } from '../schemas/teacher.model';
import { TeacherDto } from 'src/dtos/teacher.dto';
import { Manager } from '../schemas/manager.model';
import { ManagerDto } from 'src/dtos/manager.dto';
import { Student } from '../schemas/student.model';
import { StudentDto } from 'src/dtos/student.dto';

@Injectable()
export class UsersService {
  private users: UserI[] = [];

  /**
   * Получение всех пользователей.
   * @returns {UserI[]} - Массив пользователей.
   */
  getAllUsers(): UserI[] {
    return this.users;
  }

  /**
   * Создание нового пользователя.
   * @param {UserDto} userDto - dto пользователя.
   * @returns {Promise<UserI>} - Созданный пользователь.
   */
  async createUser(userDto: UserDto): Promise<UserI> {
    let newUser: UserI;

    switch (userDto.role) {
      case 'teacher':
        newUser = new Teacher(userDto as TeacherDto);
        break;
      case 'manager':
        newUser = new Manager(userDto as ManagerDto);
        break;
      case 'student':
        newUser = new Student(userDto as StudentDto);
        break;
      default:
        newUser = new User(userDto as UserDto);
        break;
    }

    this.users.push(newUser);
    return newUser;
  }

  /**
   * Получение пользователя по id.
   * @param {string} id - id пользователя.
   * @returns {Promise<UserI>} - Найденный пользователь.
   */
  async getUserById(id: string): Promise<UserI> {
    return this.users.find((user) => user.id === id);
  }

  /**
   * Обновление информации о пользователе.
   * @param {string} id - id пользователя.
   * @param {UserDto} userDto - dto пользователя.
   * @returns {Promise<UserI>} - Обновленный пользователь.
   */
  async updateUser(id: string, userDto: UserDto): Promise<UserI> {
    const user = this.users.find((user) => user.id === id);

    if (user) {
      user.id = userDto.id;
      user.name = userDto.name;
      user.surname = userDto.surname;
      user.patronymic = userDto.patronymic;
      user.birthDate = userDto.birthDate;
      user.gender = userDto.gender;
      user.country = userDto.country;
      user.city = userDto.city;
      user.email = userDto.email;
      user.phone = userDto.phone;
      user.address = userDto.address;
      user.company = userDto.company;
      user.role = userDto.role;
      user.isAdmin = userDto.isAdmin;

      return user;
    }

    return null;
  }

  /**
   * Удаление пользователя по id.
   * @param {string} id - id пользователя.
   * @returns {Promise<void>}
   */
  async deleteUser(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
