import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
  declarations: [SignupComponent, SigninComponent],
  imports: [
    FormsModule,
    RouterModule.forChild([
      { path: 'signup', component: SignupComponent },
      { path: 'signin', component: SigninComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AuthModule {}
