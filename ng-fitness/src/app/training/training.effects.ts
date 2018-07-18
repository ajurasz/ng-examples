import { Actions } from '@ngrx/effects';
import { TrainingService } from './training.service';
import { Injectable } from '@angular/core';

@Injectable()
export class TrainingEffects {
  constructor(
    private actions$: Actions,
    private trainingService: TrainingService
  ) {}
}
