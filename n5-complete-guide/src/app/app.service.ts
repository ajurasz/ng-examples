import * as firebase from 'firebase';

import { environment } from '../environments/environment';

export class AppService {
  initFirebise() {
    console.log('initFirebise');
    firebase.initializeApp({
      apiKey: environment.apiKey,
      authDomain: environment.authDomain
    });
  }

  onAuthStateChange(func) {
    return firebase.auth().onAuthStateChanged(func);
  }
}
