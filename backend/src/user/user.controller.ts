import {
  Controller,
  Param,
  Get,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { UserI } from './types/user.interface';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Получение всех пользователей.
   * @returns {Promise<UserI[]>}
   */
  @Get()
  async getAllUsers(): Promise<UserI[]> {
    return this.usersService.getAllUsers();
  }

  /**
   * Получение пользователя по id.
   * @param {string} id - id пользователя.
   * @returns {Promise<UserI>}
   */
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserI> {
    return this.usersService.getUserById(id);
  }

  /**
   * Создание нового пользователя.
   * @param {UserDto} userDto - Данные пользователя для создания.
   * @returns {Promise<UserI>}
   */
  @Post()
  async createUser(@Body() userDto: UserDto): Promise<UserI> {
    return this.usersService.createUser(userDto);
  }

  /**
   * Обновление существующего пользователя.
   * @param {string} id - id пользователя для обновления.
   * @param {UserDto} userDto - Обновленные данные пользователя.
   * @returns {Promise<UserI>}
   */
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userDto: UserDto,
  ): Promise<UserI> {
    return this.usersService.updateUser(id, userDto);
  }

  /**
   * Удаление пользователя по id.
   * @param {string} id - id пользователя для удаления.
   * @returns {Promise<void>}
   */
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
