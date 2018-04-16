import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    )
  ]
};

export function reduce(state = initialState, action): State {
  switch (action.type) {
    default:
      return state;
  }
}

const recipesFeatureSelector = createFeatureSelector<State>('recipes');

export const getRecipes = createSelector(
  recipesFeatureSelector,
  (state: State) => state.recipes
);
