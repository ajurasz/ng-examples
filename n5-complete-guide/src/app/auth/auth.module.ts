import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

export const routes: Route[] = [
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent }
];

@NgModule({
  declarations: [SignupComponent, SigninComponent],
  imports: [FormsModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthModule {}
