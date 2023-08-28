import BaseState from './BaseState';
import { Status } from './types';

class ErrorState extends BaseState {
  constructor(error?: string) {
    super(
      Status.Error,
      error ?? 'Произошла непредвиденная ошибка',
    );
  }
}

export default ErrorState;
