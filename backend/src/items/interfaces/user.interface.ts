import { Address, Company } from '../../schemas/user.model';

export interface UserI {
  id: string;
  name: string;
  surname: string;
  patronymic: string;
  birthDate: Date;
  gender: string;
  country: string;
  city: string;
  email: string;
  phone: string;
  address: Address;
  company: Company;
  role: string;
  isAdmin: boolean;
}
