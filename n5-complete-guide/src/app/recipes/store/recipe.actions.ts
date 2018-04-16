import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export enum RecipeActionTypes {
  ADD_RECIPE = '[Recipe] Add recipe'
}

export class AddRecipeAction implements Action {
  readonly type = RecipeActionTypes.ADD_RECIPE;

  constructor(public recipe: Recipe) {}
}

export type RecipeActions = AddRecipeAction;
