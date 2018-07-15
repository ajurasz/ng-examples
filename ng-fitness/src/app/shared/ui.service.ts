import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UiService {
  exercisesLoaded = new BehaviorSubject<boolean>(false);

  constructor(private snackbar: MatSnackBar) {}

  showMessage(message, action, config) {
    this.snackbar.open(message, action, config);
  }
}
