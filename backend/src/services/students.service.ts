import { Injectable, Logger  } from '@nestjs/common';
import { StudentDto } from '../dtos/student.dto';
import { Student } from '../items/interfaces/student.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class StudentsService {
  private students: Student[] = [];
  constructor(
    @InjectModel('Student') private readonly studentModel: Model<Student>,
  ) {}
  private logger = new Logger(StudentsService.name);


  /**
   * Получение всех студентов
   */
  async getAllStudents(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }


  /**
   * Создание нового студента
   * @param studentDto Данные студента
   */
  async createStudent(studentDto: StudentDto): Promise<Student> {
    const newStudent = new this.studentModel(studentDto);
    return newStudent.save();
  }


  /**
   * Обновление информации о студенте
   * @param id id студента
   * @param studentDto Данные студента
   */
  async updateStudent(id: string, studentDto: StudentDto): Promise<Student> {
    return this.studentModel.findByIdAndUpdate(id, studentDto, { new: true });
  }


  /**
   * Удаление студента
   * @param id id студента
   */
  async deleteStudent(id: string): Promise<void> {
    await this.studentModel.findByIdAndDelete(id);
  }


  /**
   * Генерация уникального id
   */
  private generateUniqueId(): string {
    return Math.random().toString(36).substring(2);
  }


  /**
   * Вывод записи в логи
   */
  private logStudents(): void {
    this.logger.log('Студенты: ' + JSON.stringify(this.students));
  }
}
