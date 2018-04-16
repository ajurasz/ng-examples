import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase';

import { environment } from '../environments/environment';
import * as fromApp from './app.reducers';
import { InitAuthAction } from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: environment.apiKey,
      authDomain: environment.authDomain
    });
    firebase
      .auth()
      .onAuthStateChanged(user => this.store.dispatch(new InitAuthAction()));
  }
}
