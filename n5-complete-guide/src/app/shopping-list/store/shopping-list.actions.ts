import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';

export enum ShoppingListActionTypes {
  ADD_INGREDIENTS = '[Shopping List] Add ingredients',
  REMOVE_INGREDIENT = '[Shopping List] Remove ingredient',
  UPDATE_INGREDIENT = '[Shopping List] Update ingredient',
  START_EDIT = '[Shopping List] Start edit',
  STOP_EDIT = '[Shopping List] Stop edit'
}

export class AddIngredientsAction implements Action {
  readonly type = ShoppingListActionTypes.ADD_INGREDIENTS;

  constructor(public ingredients: Ingredient[]) {}
}

export class UpdateIngredientAction implements Action {
  readonly type = ShoppingListActionTypes.UPDATE_INGREDIENT;

  constructor(public updatedIngredient: Ingredient) {}
}

export class RemoveIngredientAction implements Action {
  readonly type = ShoppingListActionTypes.REMOVE_INGREDIENT;
}

export class StartEditAction implements Action {
  readonly type = ShoppingListActionTypes.START_EDIT;

  constructor(public index: number) {}
}

export class StopEditAction implements Action {
  readonly type = ShoppingListActionTypes.STOP_EDIT;
}

export type ShoppingListActions =
  | AddIngredientsAction
  | UpdateIngredientAction
  | RemoveIngredientAction
  | StartEditAction
  | StopEditAction;
