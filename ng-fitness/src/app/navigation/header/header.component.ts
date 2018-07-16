import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';

import * as fromAuth from '../../auth/auth.reducers';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth$: Observable<boolean>;
  @Output() toggle = new EventEmitter<void>();

  constructor(private authService: AuthService, private store: Store<any>) {}

  ngOnInit() {
    this.isAuth$ = this.store.select(fromAuth.isAuthenticated);
  }

  onMenuClicked() {
    this.toggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
