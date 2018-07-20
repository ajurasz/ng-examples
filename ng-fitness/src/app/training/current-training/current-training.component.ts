import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingDialogComponent } from './stop-training-dialog.component';
import { Store } from '@ngrx/store';
import {
  CompleteExerciseAction,
  CancelExerciseAction
} from '../training.actions';
import { getRunningExercise } from '../training.reducers';
import { Subscription } from 'rxjs/Subscription';
import { Exercise } from '../exercise.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  exerciseSubscription: Subscription;
  exercise: Exercise;
  progress = 0;
  timer: any;
  constructor(private dialog: MatDialog, private store: Store<any>) {}

  ngOnInit() {
    this.exerciseSubscription = this.store
      .select(getRunningExercise)
      .pipe(
        filter(exercise => exercise !== null),
        filter(exercise => {
          if (this.exercise) {
            return exercise.id !== exercise.id;
          } else {
            return true;
          }
        })
      )
      .subscribe(exercise => {
        this.exercise = exercise;
        this.startOrResumeTimer();
      });
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    this.exerciseSubscription.unsubscribe();
  }

  startOrResumeTimer() {
    const step = (this.exercise.duration / 100) * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.store.dispatch(new CompleteExerciseAction());
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingDialogComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new CancelExerciseAction(this.progress));
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
