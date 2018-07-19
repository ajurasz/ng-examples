import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { getAvailableExercises } from '../training.reducers';
import { LoadAvailableExercisesAction } from '../training.actions';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Observable<Exercise[]>;
  selectedExerciseId: string;

  constructor(
    private trainingService: TrainingService,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.store.dispatch(new LoadAvailableExercisesAction());
    this.exercises = this.store.select(getAvailableExercises);
  }

  onStart(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
