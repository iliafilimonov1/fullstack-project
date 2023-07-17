import { Teacher } from './../schemas/teacher.model';
import { Course } from '../schemas/course.model';

export class StudentDto {
  specializationId: string;
  groupNumber: string;
  teachers: Teacher[];
  courses: Course[];
}
