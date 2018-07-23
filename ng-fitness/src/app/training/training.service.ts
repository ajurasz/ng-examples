import { Exercise, ExerciseData } from './exercise.model';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { StartLoadingAction, StopLoadingAction } from '../shared/ui.actions';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { LoadAvailableExercisesAction } from './training.actions';

@Injectable()
export class TrainingService {
  private static readonly COLLECTION_EXERCISES = 'exercises';
  private static readonly COLLECTION_AVAILABLE_EXERCISES = 'availableExercises';

  private subscriptions: Subscription[] = [];
  availableExercises = new BehaviorSubject<Exercise[]>([]);
  completedOrCanceledExercises = new BehaviorSubject<Exercise[]>([]);

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

  fetchAvailableExercises() {
    this.store.dispatch(new StartLoadingAction());
    this.subscriptions.push(
      this.db
        .collection(TrainingService.COLLECTION_AVAILABLE_EXERCISES)
        .snapshotChanges()
        .pipe(map(this.transform))
        .subscribe(exercises => {
          this.availableExercises.next(exercises);
          this.store.dispatch(new LoadAvailableExercisesAction(exercises));
          this.store.dispatch(new StopLoadingAction());
        })
    );
  }

  fetchCompletedOrCanceledExercises() {
    this.store.dispatch(new StartLoadingAction());
    this.subscriptions.push(
      this.db
        .collection(TrainingService.COLLECTION_EXERCISES)
        .snapshotChanges()
        .pipe(map(this.transform))
        .subscribe(exercises => {
          this.completedOrCanceledExercises.next(exercises);
          this.store.dispatch(new StopLoadingAction());
        })
    );
  }

  saveExercise(exercise: Exercise): Observable<boolean> {
    const exerciseDate = { ...exercise } as ExerciseData;
    return fromPromise(
      this.db.collection(TrainingService.COLLECTION_EXERCISES).add(exerciseDate)
    ).pipe(map(_ => true));
  }

  cleanupSubscriptions() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }
}
