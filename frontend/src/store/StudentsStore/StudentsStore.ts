import { runInAction } from 'mobx';
import BaseListStore from '../BaseListStore/BaseListStore';
import { Student } from '../StudentStore/types';

class StudentsStore extends BaseListStore<Student> {
  constructor(data?: Student[]) {
    super(data ?? []);
  }

  public fetch() {
    this.runWithStateControl(async () => {
      runInAction(() => {
        this.list = [];
      });
    });
  }

  public addNewStudent(data?: Partial<Student>) {
    if (!data) {
      return;
    }
    const preparedStudent = {
      ...data,
      id: `${(new Date()).toISOString()}_${Math.random() * 10}`,
    } as Student;
    runInAction(() => {
      this.list = [...(this.list ?? []), preparedStudent];
    });
  }

  public updateStudent(updatedStudent: Omit<Student, 'id'>) {
    runInAction(() => {
      const index = this.list.findIndex((student) => student.id === updatedStudent.id);
      if (index !== -1) {
        this.list[index] = updatedStudent;
      }
    });
  }

  public deleteStudent(id: string) {
    runInAction(() => {
      this.list = this.list.filter((i) => i.id !== id);
    });
  }
}

export default StudentsStore;
