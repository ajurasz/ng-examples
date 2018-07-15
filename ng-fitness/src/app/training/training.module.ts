import { NgModule } from '@angular/core';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { TrainingComponent } from './training.component';
import { StopTrainingDialogComponent } from './current-training/stop-training-dialog.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingService } from './training.service';

@NgModule({
  declarations: [
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    TrainingComponent,
    StopTrainingDialogComponent
  ],
  imports: [SharedModule, TrainingRoutingModule, AngularFirestoreModule],
  providers: [TrainingService],
  entryComponents: [StopTrainingDialogComponent]
})
export class TrainingModule {}
