import { Course } from '../schemas/course.model';

export class TeacherDto {
  specializationId: string;
  courses: Course[];
}
