import axios from 'axios';
import { Student } from '@/store/StudentStore/types';

class StudentsService {
  static get RoutePath(): string {
    return 'students';
  }

  /** Список студентов */
  static async StudentsList() {
    const response = await axios.get<Student[]>(this.RoutePath);
    return response;
  }
}

export default StudentsService;
