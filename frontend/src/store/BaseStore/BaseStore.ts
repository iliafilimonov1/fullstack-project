import {
  action, computed, makeObservable, observable, runInAction,
} from 'mobx';
import {
  BaseState, ErrorState, FetchingState, SuccessState,
} from '../StateStores';

/** Абстрактный базовый класс с состоянием */
abstract class BaseStore {
  @observable public _state?: BaseState = new BaseState();

  constructor() {
    try {
      makeObservable(this);
    } catch (error) {
      console.warn(error);
    }
  }

  @computed public get state() {
    return this._state;
  }

  /**
   * Функция обертка в которую необходимо передавать асинхронную функцию
   * чтобы контролировать состояние загрузки
   */
  @action protected async runWithStateControl<T = void>(
    func: () => (Promise<T>),
  ): Promise<T | undefined> {
    this._state = new FetchingState();
    try {
      const result = await func();
      runInAction(() => {
        this._state = new SuccessState();
      });
      return result;
    } catch (error) {
      runInAction(() => {
        if (typeof error === 'object' && error !== null) {
          this._state = new ErrorState(`An error occurred: ${(error as Error).message}`);
        }
      });
      return undefined;
    }
  }
}

export default BaseStore;
