import { makeAutoObservable } from 'mobx';

export class UserStore {
  id?: 'anyId';

  /** Важно проинициализировать поля и прописать им хотябы undefined (только на next.js вроде)
   * но это не точно
   */
  public name?: string = undefined;

  public surname?: string = undefined;

  constructor() {
  /** Делает все поля сущности отслеживаемыми */
    makeAutoObservable(this);
  }

  public async fetch() {
    await console.log('not implemented', this.id);
  }
}
