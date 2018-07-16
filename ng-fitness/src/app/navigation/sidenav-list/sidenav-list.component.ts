import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs/Observable';

import * as fromAuth from '../../auth/auth.reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  isAuth$: Observable<boolean>;
  @Output() close = new EventEmitter<void>();

  constructor(private authService: AuthService, private store: Store<any>) {}

  ngOnInit() {
    this.isAuth$ = this.store.select(fromAuth.isAuthenticated);
  }

  onListItemClick() {
    this.close.emit();
  }

  onLogout() {
    this.onListItemClick();
    this.authService.logout();
  }
}
