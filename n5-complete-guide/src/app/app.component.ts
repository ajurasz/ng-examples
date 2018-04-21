import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from './app.reducers';
import { AppService } from './app.service';
import { InitAuthAction } from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private appService: AppService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.appService.initFirebise();
    this.appService.onAuthStateChange(user =>
      this.store.dispatch(new InitAuthAction())
    );
  }
}
