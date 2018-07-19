import { Exercise, ExerciseData } from './exercise.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import { map, tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store } from '@ngrx/store';
import {
  StartLoadingAction,
  StopLoadingAction,
  DisplayMessageAction
} from '../shared/ui.actions';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class TrainingService {
  private static readonly COLLECTION_EXERCISES = 'exercises';
  private static readonly COLLECTION_AVAILABLE_EXERCISES = 'availableExercises';

  private availableExercises = new BehaviorSubject<Exercise[]>([]);
  private runningExercise: Exercise;

  exerciseChange = new Subject<Exercise>();

  constructor(private db: AngularFirestore, private store: Store<any>) {}

  private transform = (docs: DocumentChangeAction[]) => {
    return docs.map(doc => {
      const payload = doc.payload.doc.data() as ExerciseData;
      return {
        id: doc.payload.doc.id,
        ...payload
      };
    });
  };

  fetchAvailableExercises(): Observable<Exercise[]> {
    return this.db
      .collection(TrainingService.COLLECTION_AVAILABLE_EXERCISES)
      .snapshotChanges()
      .pipe(map(this.transform));
  }

  getCompletedOrCanceledExercises(): Observable<Exercise[]> {
    this.store.dispatch(new StartLoadingAction());
    return this.db
      .collection(TrainingService.COLLECTION_EXERCISES)
      .snapshotChanges()
      .pipe(
        map(this.transform),
        tap(_ => {
          this.store.dispatch(new StopLoadingAction());
        }),
        catchError(err => this.handleErrors(err))
      );
  }

  private handleErrors(err): ErrorObservable {
    console.error(err);
    this.store.dispatch(new StopLoadingAction());
    this.store.dispatch(
      new DisplayMessageAction(err.message, null, { duration: 3000 })
    );
    return _throw(err);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  startExercise(selectedExerciseId: string) {
    this.runningExercise = this.availableExercises
      .getValue()
      .find(ex => ex.id === selectedExerciseId);
    this.exerciseChange.next({ ...this.runningExercise });
  }

  private saveExercise(exercise: Exercise) {
    this.store.dispatch(new StartLoadingAction());
    const exerciseDate = { ...exercise } as ExerciseData;
    return fromPromise(
      this.db.collection(TrainingService.COLLECTION_EXERCISES).add(exerciseDate)
    ).pipe(
      map(_ => true),
      tap(_ => {
        this.store.dispatch(new StopLoadingAction());
      }),
      catchError(err => this.handleErrors(err))
    );
  }

  completeExercise() {
    this.saveExercise({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    }).subscribe(_ => {
      this.runningExercise = null;
      this.exerciseChange.next(null);
    });
  }

  cancelExercise(progress: number) {
    this.saveExercise({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'canceled'
    }).subscribe(_ => {
      this.runningExercise = null;
      this.exerciseChange.next(null);
    });
  }
}
