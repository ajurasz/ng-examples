import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom, tap } from 'rxjs/operators';

import {
  RecipeActionTypes,
  RecipeActions,
  AddRecipeAndRedirectAction,
  FetchRecipesCompleteAction
} from './recipe.actions';
import * as fromRecipe from './recipe.reducers';
import { Recipe } from '../recipe.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class RecipeEffects {
  readonly RECIPES_DB_URL = environment.recipes_db_url;

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

  @Effect()
  fetch$ = this.actions$
    .ofType(RecipeActionTypes.FETCH_RECIPES)
    .pipe(
      switchMap(action => this.httpClient.get<Recipe[]>(this.RECIPES_DB_URL)),
      map((recipes: Recipe[]) => new FetchRecipesCompleteAction(recipes))
    );

  @Effect({ dispatch: false })
  save$ = this.actions$
    .ofType(RecipeActionTypes.SAVE_RECIPE_TO_REMOTE)
    .pipe(
      withLatestFrom(this.store.select(fromRecipe.getRecipes)),
      switchMap(([action, state]) =>
        this.httpClient.put(this.RECIPES_DB_URL, state, { observe: 'response' })
      ),
      tap((response: HttpResponse<any>) => console.log(response))
    );

  constructor(
    private actions$: Actions,
    private store: Store<fromRecipe.State>,
    private router: Router,
    private httpClient: HttpClient
  ) {}
}
