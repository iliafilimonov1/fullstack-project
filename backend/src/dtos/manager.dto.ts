import { User } from '../schemas/user.model';

export class ManagerDto extends User {
  department: string;
  position: string;
  subordinates: User[];
}
