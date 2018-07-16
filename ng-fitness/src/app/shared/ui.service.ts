import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class UiService {
  exercisesLoaded = new BehaviorSubject<boolean>(false);
}
