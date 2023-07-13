import BaseViewModel from '../store/BaseViewModel/BaseViewModel';

export function required<T extends BaseViewModel<T>>(
  _: T,
  propertyKey: keyof T,
  descriptor: PropertyDescriptor,
) {
  const originalSetter = descriptor.set;
  descriptor.set = function newSetter(this: T, value: T[keyof T]) {
    originalSetter?.call(this, value);
    if (!value) {
      this.errors[propertyKey as string] = 'Поле обязательно для заполнения';
    } else {
      delete this.errors[propertyKey as string];
    }
  };
}
