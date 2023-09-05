import { Student } from './types';
import BaseViewModel from '../BaseViewModel/BaseViewModel';

class StudentViewModel extends BaseViewModel<Student> {
  public get id() {
    return this.data.id;
  }

  public get name() {
    return this.data.name;
  }

  public set name(value: string | undefined) {
    this.data.name = value;
  }

  public get surname() {
    return this.data.surname;
  }

  public set surname(value: string | undefined) {
    this.data.surname = value;
  }

  public get address() {
    return this.data.address;
  }

  public set address(value: string | undefined) {
    this.data.address = value;
  }

  public get age() {
    return this.data.age;
  }

  public set age(value: number | undefined) {
    this.data.age = value;
  }

  public get groupName() {
    return this.data.groupName;
  }

  public set groupName(value: string | undefined) {
    this.data.groupName = value;
  }
}

export default StudentViewModel;
