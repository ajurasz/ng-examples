import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  authSubscription: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.checkForUser().subscribe(user => {
      if (user) {
        this.authService.authSuccessful();
      }
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
