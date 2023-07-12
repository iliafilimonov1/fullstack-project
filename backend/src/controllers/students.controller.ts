import { Controller, Param, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { StudentDto } from '../dtos/student.dto';
import { StudentsService } from '../services/students.service';
import { Student } from 'src/items/interfaces/student.interface';

// Контроллер, отвечающий за маршруты связанные со студентами
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  async getAllStudents(): Promise<Student[]> {
    return this.studentsService.getAllStudents();
  }

  @Post()
  async createStudent(@Body() studentDto: StudentDto): Promise<Student> {
    return this.studentsService.createStudent(studentDto);
  }

  @Put(':id')
  async updateStudent(
    @Param('id') id: string,
    @Body() studentDto: StudentDto,
  ): Promise<Student> {
    return this.studentsService.updateStudent(id, studentDto);
  }

  @Delete(':id')
  async deleteStudent(@Param('id') id: string): Promise<void> {
    return this.studentsService.deleteStudent(id);
  }
}
