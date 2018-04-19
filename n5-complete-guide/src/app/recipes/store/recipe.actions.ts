import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export enum RecipeActionTypes {
  ADD_RECIPE = '[Recipe] Add recipe',
  ADD_RECIPE_AND_REDIRECT = '[Recipe] Add and redirect',
  DELETE_RECIPE = '[Recipe] Delete recipe',
  UPDATE_RECIPE = '[Recipe] Update recipe',
  FETCH_RECIPES = '[Recipe] Fetch recipes',
  FETCH_RECIPES_COMPLETE = '[Recipe] Fetch recipes complete',
  SAVE_RECIPE_TO_REMOTE = '[Recipe] Save to remote'
}

export class AddRecipeAction implements Action {
  readonly type = RecipeActionTypes.ADD_RECIPE;

  constructor(public recipe: Recipe) {}
}

export class AddRecipeAndRedirectAction implements Action {
  readonly type = RecipeActionTypes.ADD_RECIPE_AND_REDIRECT;

  constructor(public recipe: Recipe) {}
}

export class DeleteRecipeAction implements Action {
  readonly type = RecipeActionTypes.DELETE_RECIPE;

  constructor(public id: number) {}
}

export class UpdateRecipeAction implements Action {
  readonly type = RecipeActionTypes.UPDATE_RECIPE;

  constructor(public id: number, public recipe: Recipe) {}
}

export class FetchRecipesAction implements Action {
  readonly type = RecipeActionTypes.FETCH_RECIPES;
}

export class FetchRecipesCompleteAction implements Action {
  readonly type = RecipeActionTypes.FETCH_RECIPES_COMPLETE;

  constructor(public recipes: Recipe[]) {}
}

export class SaveRecipeToRemoteAction implements Action {
  readonly type = RecipeActionTypes.SAVE_RECIPE_TO_REMOTE;
}

export type RecipeActions =
  | AddRecipeAction
  | AddRecipeAndRedirectAction
  | DeleteRecipeAction
  | UpdateRecipeAction
  | FetchRecipesAction
  | FetchRecipesCompleteAction;
