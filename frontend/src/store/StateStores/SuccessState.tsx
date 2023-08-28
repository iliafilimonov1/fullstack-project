import BaseState from './BaseState';
import { Status } from './types';

class SuccessState extends BaseState {
  constructor() {
    super(Status.Success);
  }
}

export default SuccessState;
