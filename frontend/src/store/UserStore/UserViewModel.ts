import { runInAction } from 'mobx';
import { required } from '@/services/decorators';
import { IUser } from './types';
import BaseViewModel from '../BaseViewModel/BaseViewModel';

class UserViewMode extends BaseViewModel<IUser> {
  public get id() {
    return this.data?.id;
  }

  @required
  public get name() {
    return this.data.name;
  }

  public set name(value: string | undefined) {
    runInAction(() => {
      this.data.name = value;
    });
  }

  @required
  public get surname() {
    return this.data.surname;
  }

  public set surname(value: string | undefined) {
    runInAction(() => {
      this.data.surname = value;
    });
  }

  public get patronymic() {
    return this.data.patronymic;
  }

  public set patronymic(value: string | undefined) {
    runInAction(() => {
      this.data.patronymic = value;
    });
  }

  public get avatar() {
    return this.data.avatar;
  }

  public set avatar(value: string | undefined) {
    runInAction(() => {
      this.data.avatar = value;
    });
  }

  set(value: string) {
    runInAction(() => {
      this.data.id = value;
    });
  }
}

export default UserViewMode;
