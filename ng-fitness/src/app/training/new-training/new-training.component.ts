import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { StartExerciseAction } from '../training.actions';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Observable<Exercise[]>;
  selectedExerciseId: string;

  constructor(
    private store: Store<any>,
    private trainingService: TrainingService
  ) {}

  ngOnInit() {
    this.exercises = this.trainingService.availableExercises;
  }

  onStart(form: NgForm) {
    this.store.dispatch(new StartExerciseAction(form.value.exercise));
  }
}
