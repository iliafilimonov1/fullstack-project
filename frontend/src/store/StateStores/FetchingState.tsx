import BaseState from './BaseState';
import { Status } from './types';

class FetchingState extends BaseState {
  constructor() {
    super(Status.Fetching);
  }
}

export default FetchingState;
