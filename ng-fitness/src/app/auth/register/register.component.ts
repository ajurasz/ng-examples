import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UiService } from '../../shared/ui.service';

import * as fromUi from '../../shared/ui.reducers';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLoading$: Observable<boolean>;
  maxDate: Date;

  constructor(private authService: AuthService, private store$: Store<any>) {}

  ngOnInit() {
    this.isLoading$ = this.store$.select(fromUi.getIsLoading);

    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onRegister(form: NgForm) {
    this.authService.register({
      email: form.value.email,
      password: form.value.password
    });
  }
}
