import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export enum RecipeActionTypes {
  ADD_RECIPE = '[Recipe] Add recipe',
  ADD_RECIPE_AND_REDIRECT = '[Recipe] Add and redirect'
}

export class AddRecipeAction implements Action {
  readonly type = RecipeActionTypes.ADD_RECIPE;

  constructor(public recipe: Recipe) {}
}

export class AddRecipeAndRedirectAction implements Action {
  readonly type = RecipeActionTypes.ADD_RECIPE_AND_REDIRECT;

  constructor(public recipe: Recipe) {}
}

export type RecipeActions = AddRecipeAction | AddRecipeAndRedirectAction;
