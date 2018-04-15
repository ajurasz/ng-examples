import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import * as fromApp from '../../app.reducers';
import { SignupAction } from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit() {}

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new SignupAction(email, password));
    // this.authService.signupUser(email, password).subscribe(value => {
    //   console.log('Successful singup!');
    //   this.router.navigateByUrl('/signin');
    // });
  }
}
