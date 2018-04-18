import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { flatMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import * as fromRecipe from './store/recipe.reducers';

@Injectable()
export class RecipesService {
  readonly RECIPES_DB_URL = environment.recipes_db_url;

  private recipesSubject: BehaviorSubject<Recipe[]> = new BehaviorSubject<
    Recipe[]
  >([]);

  constructor(
    private httpClient: HttpClient,
    private store: Store<fromRecipe.State>
  ) {}

  getRecipe(id: number) {
    return this.recipesSubject.getValue()[id];
  }

  updateRecipe(index: number, recipe: Recipe) {
    const recipes = this.recipesSubject.getValue();
    recipes[index] = recipe;
    this.recipesSubject.next(recipes);
  }

  saveRecipesToRemote(): Observable<HttpResponse<any>> {
    return this.httpClient.put(
      this.RECIPES_DB_URL,
      this.recipesSubject.getValue(),
      { observe: 'response' }
    );
  }

  fetchRecipesFromRemote() {
    this.httpClient
      .get<Recipe[]>(this.RECIPES_DB_URL)
      .subscribe(recipes => this.recipesSubject.next(recipes));
  }
}
