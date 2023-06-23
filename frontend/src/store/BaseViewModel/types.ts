/** Вью модель сущности */
export interface IViewModel<T> {
  /** Объект с данными */
  get data(): Partial<T>;
  /** Получить чистый объект с данными */
  getRawData: () => Partial<T>;
  /** Очистить вью модель */
  clear(): void;
}
