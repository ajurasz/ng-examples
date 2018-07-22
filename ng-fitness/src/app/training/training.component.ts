import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getRunningExercise } from './training.reducers';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { FetchDataAction } from './training.actions';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining: Observable<boolean>;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.store.dispatch(new FetchDataAction());
    this.ongoingTraining = this.store
      .select(getRunningExercise)
      .pipe(map(exercise => (exercise ? true : false)));
  }
}
