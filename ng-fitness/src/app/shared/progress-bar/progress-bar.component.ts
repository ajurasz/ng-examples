import { Component } from '@angular/core';
import { UiService } from '../ui.service';

@Component({
  selector: 'app-progress-bar',
  template: `
    <mat-progress-bar *ngIf="uiService.loadingChange | async" mode="indeterminate"></mat-progress-bar>
  `,
  styles: [
    `
      mat-progress-bar {
        margin-top: 1px;
      }
    `
  ]
})
export class ProgressBarComponent {
  constructor(private uiService: UiService) {}
}
