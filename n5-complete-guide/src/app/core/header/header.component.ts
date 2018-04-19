import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthService } from '../../auth/auth.service';
import * as fromRecipe from '../../recipes/store/recipe.reducers';
import {
  FetchRecipesAction,
  SaveRecipeToRemoteAction
} from '../../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private store: Store<fromRecipe.State>
  ) {}

  ngOnInit() {}

  onSave() {
    this.store.dispatch(new SaveRecipeToRemoteAction());
  }

  onFetch() {
    this.store.dispatch(new FetchRecipesAction());
  }

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.authenticated();
  }
}
