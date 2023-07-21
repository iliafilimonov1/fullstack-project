import { IAddress } from '../../schemas/address.model';
import { Company } from '../../schemas/company.model';

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
  address: IAddress;
  company: Company;
  role: string;
  isAdmin: boolean;
}
