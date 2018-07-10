import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  authChangeSubscription: Subscription;
  @Output() toggle = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authChangeSubscription = this.authService.authChange.subscribe(
      isAuth => (this.isAuth = isAuth)
    );
  }

  ngOnDestroy() {
    this.authChangeSubscription.unsubscribe();
  }

  onMenuClicked() {
    this.toggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
