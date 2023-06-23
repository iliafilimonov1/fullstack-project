import {
  computed, makeObservable, observable, runInAction,
} from 'mobx';
import BaseStore from '../BaseStore/BaseStore';

class BaseViewModel<T> extends BaseStore {
  @observable private _data: Partial<T>;

  @observable private _errors: Record<string, string>;

  @computed public get data() {
    return this._data;
  }

  @computed public get errors() {
    return this._errors;
  }

  constructor(data: Partial<T>) {
    super();
    this._data = data;
    this._errors = {};
    makeObservable(this);
  }

  public clear() {
    runInAction(() => {
      this._data = {};
      this._errors = {};
    });
  }
}

export default BaseViewModel;
