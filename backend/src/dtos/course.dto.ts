import { Teacher } from '../schemas/teacher.model';
import { Student } from '../schemas/student.model';

export class CourseDto {
  name: string;
  teacher: Teacher;
  maxStudents: number;
  durationWeeks: number;
  startDate: Date;
  students: Student[];
  description: string;
}
