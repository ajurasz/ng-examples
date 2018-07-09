import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-stop-training-dialog',
  template: `
  <h2>Are you sure?</h2>
  <mat-dialog-content><p>You already got {{ data.progress }}%</p></mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button [mat-dialog-close]="true">Yes</button>
    <button mat-button [mat-dialog-close]="false">No</button>
  </mat-dialog-actions>
    `
})
export class StopTrainingDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
