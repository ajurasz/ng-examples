import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromUi from '../ui.reducers';

@Component({
  selector: 'app-progress-bar',
  template: `
    <mat-progress-bar *ngIf="isLoading$ | async" mode="indeterminate"></mat-progress-bar>
  `,
  styles: [
    `
      mat-progress-bar {
        margin-top: 1px;
      }
    `
  ]
})
export class ProgressBarComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromUi.getIsLoading);
  }
}
