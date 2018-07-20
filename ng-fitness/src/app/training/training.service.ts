import { Exercise, ExerciseData } from './exercise.model';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export class TrainingService {
  private static readonly COLLECTION_EXERCISES = 'exercises';
  private static readonly COLLECTION_AVAILABLE_EXERCISES = 'availableExercises';

  constructor(private db: AngularFirestore) {}

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

  fetchCompletedOrCanceledExercises(): Observable<Exercise[]> {
    return this.db
      .collection(TrainingService.COLLECTION_EXERCISES)
      .snapshotChanges()
      .pipe(map(this.transform));
  }

  saveExercise(exercise: Exercise): Observable<boolean> {
    const exerciseDate = { ...exercise } as ExerciseData;
    return fromPromise(
      this.db.collection(TrainingService.COLLECTION_EXERCISES).add(exerciseDate)
    ).pipe(map(_ => true));
  }
}
