import { computed, observable } from 'mobx';
import { Status } from './types';

/** Класс состояния стора */
class BaseState {
  /** Статус стора */
  @observable private status: Status;

  /** Текст ошибки */
  @observable private _error?: string;

  /** Ошибка стора */
  @computed get error() {
    return this._error;
  }

  /** Статус загрузки */
  @computed get isInitial(): boolean {
    return this.status === Status.Initial;
  }

  /** Статус загрузки */
  @computed get isLoading(): boolean {
    return this.status === Status.Fetching;
  }

  /** Показатель успешности */
  @computed get isSuccess(): boolean {
    return this.status === Status.Success;
  }

  /** Наличие ошибки */
  @computed get isError(): boolean {
    return this.status === Status.Error;
  }

  constructor(status?: Status, errorText?: string) {
    this.status = status ?? Status.Initial;
    if (errorText) {
      this._error = errorText;
    }
  }
}

export default BaseState;
