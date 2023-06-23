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
}

export default StudentViewModel;
