import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, withLatestFrom } from 'rxjs/operators';

import {
  RecipeActionTypes,
  RecipeActions,
  AddRecipeAndRedirectAction
} from './recipe.actions';
import * as fromRecipe from './recipe.reducers';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects {
  @Effect({ dispatch: false })
  redirect$ = this.actions$
    .ofType(RecipeActionTypes.ADD_RECIPE_AND_REDIRECT)
    .pipe(
      withLatestFrom(this.store.select(fromRecipe.getRecipes)),
      switchMap(([action, state]) => {
        const id = state.length - 1;
        return this.router.navigate(['/', 'recipes', id]);
      })
    );

  constructor(
    private actions$: Actions,
    private store: Store<fromRecipe.State>,
    private router: Router
  ) {}
}
