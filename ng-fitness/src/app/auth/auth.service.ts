import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';

export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  register(authData: AuthData) {
    this.user = {
      id: Math.round(Math.random() * 10000).toString(),
      email: authData.email
    };
    this.authChange.next(true);
  }

  login(authData: AuthData) {
    this.user = {
      id: Math.round(Math.random() * 10000).toString(),
      email: authData.email
    };
    this.authChange.next(true);
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
  }

  isAuth() {
    return this.user != null;
  }

  getUser() {
    return {
      ...this.user
    };
  }
}
