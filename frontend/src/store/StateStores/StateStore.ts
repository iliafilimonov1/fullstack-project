import { makeAutoObservable } from 'mobx';
import { Status } from './types';

/** Класс состояния стора */
class StateStore {
  /** Статус стора */
  public status: Status;

  /** Текст ошибки */
  private _error?: string;

  /** Ошибка стора */
  public get error() {
    return this._error;
  }

  /** Статус загрузки */
  public get isInitial(): boolean {
    return this.status === Status.Initial;
  }

  /** Статус загрузки */
  public get isLoading(): boolean {
    return this.status === Status.Fetching;
  }

  /** Показатель успешности */
  public get isSuccess(): boolean {
    return this.status === Status.Success;
  }

  /** Наличие ошибки */
  public get isError(): boolean {
    return this.status === Status.Error;
  }

  constructor(status?: Status, errorText?: string) {
    makeAutoObservable(this);
    this.status = status ?? Status.Initial;
    if (errorText) {
      this._error = errorText;
    }
  }
}

export default StateStore;
