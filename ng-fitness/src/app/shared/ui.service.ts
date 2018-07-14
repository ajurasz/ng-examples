import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class UiService {
  exercisesLoaded = new BehaviorSubject<boolean>(false);
  loadingChange = new Subject<boolean>();
}
