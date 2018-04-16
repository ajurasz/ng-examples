import { createSelector } from '@ngrx/store';

import * as fromApp from '../../app.reducers';
import { Ingredient } from '../../shared/ingredient.model';

import {
  ShoppingListActions,
  ShoppingListActionTypes
} from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient('tomato', 2), new Ingredient('potato', 10)],
  editedIngredient: null,
  editedIngredientIndex: null
};

export function reduce(
  state = initialState,
  action: ShoppingListActions
): State {
  switch (action.type) {
    case ShoppingListActionTypes.ADD_INGREDIENTS: {
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.ingredients]
      };
    }
    case ShoppingListActionTypes.REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (value, index) => index !== state.editedIngredientIndex
        ),
        editedIngredient: null,
        editedIngredientIndex: null
      };
    }
    case ShoppingListActionTypes.UPDATE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.map((value, index) => {
          if (index === state.editedIngredientIndex) {
            return action.updatedIngredient;
          }
          return value;
        }),
        editedIngredient: {
          ...action.updatedIngredient
        }
      };
    }
    case ShoppingListActionTypes.START_EDIT: {
      const ingredient = { ...state.ingredients[action.index] };
      return {
        ...state,
        editedIngredient: ingredient,
        editedIngredientIndex: action.index
      };
    }
    case ShoppingListActionTypes.STOP_EDIT: {
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: null
      };
    }
    default:
      return state;
  }
}

export const getIngredients = createSelector(
  (state: fromApp.AppState) => state.shoppingList,
  (shoppingList: State) => shoppingList.ingredients
);

export const getEditedItem = createSelector(
  (state: fromApp.AppState) => state.shoppingList,
  (shoppingList: State) => {
    return {
      editedIngredient: shoppingList.editedIngredient,
      editedIngredientIndex: shoppingList.editedIngredientIndex
    };
  }
);
