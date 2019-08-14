import { Worker } from './models/worker.model';
import { Meetup } from './models/meetup.model';

export interface AppState {
  readonly worker: Worker[];
  readonly meetup: Meetup[];
}
