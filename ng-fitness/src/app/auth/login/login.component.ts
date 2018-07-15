import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromUi from '../../shared/ui.reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading$: Observable<boolean>;
  loginForm: FormGroup;

  constructor(private authService: AuthService, private store$: Store<any>) {}

  ngOnInit() {
    this.isLoading$ = this.store$.select(fromUi.getIsLoading);

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onLogin() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }
}
