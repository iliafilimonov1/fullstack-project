// import { Address, Company } from '../';

export interface UserI {
  id: string;
  username: string;
  password: string;
  // surname: string;
  // patronymic: string;
  // birthDate: Date;
  // gender: string;
  // country: string;
  // city: string;
  // email: string;
  // phone: string;
  // address: Address;
  // company: Company;
  role?: string;
  access_token?: string;
  refresh_token?: string;
  accessTokenExpiresAt?: Date;
  // isAdmin: boolean;
}
