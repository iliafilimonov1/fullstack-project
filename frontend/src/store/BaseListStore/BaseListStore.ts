import { makeObservable, observable } from 'mobx';
import BaseStore from '../BaseStore/BaseStore';

class BaseListStore<T extends Object> extends BaseStore {
  @observable public list: T[] = [];

  constructor(data: T[]) {
    super();
    this.list = data;
    makeObservable(this);
  }
}

export default BaseListStore;
