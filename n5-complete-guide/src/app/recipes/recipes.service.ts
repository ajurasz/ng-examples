import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RecipesService {
  private recipesSubject: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>(
    [
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
  );

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes(): Observable<Recipe[]> {
    return this.recipesSubject.asObservable();
  }

  getRecipe(id: number) {
    return this.recipesSubject.getValue()[id];
  }

  addRecipe(recipe: Recipe): number {
    const recipes = this.recipesSubject.getValue().concat([recipe]);
    this.recipesSubject.next(recipes);
    return recipes.length - 1;
  }

  deleteRecipe(id: number) {
    const recipes = this.recipesSubject.getValue().filter(
      (recipe, index) => {
        if (index !== id) {
          return recipe;
        }
      }
    );
    console.log(recipes);
    this.recipesSubject.next(recipes);
  }

  updateRecipe(index: number, recipe: Recipe) {
    const recipes = this.recipesSubject.getValue();
    recipes[index] = recipe;
    this.recipesSubject.next(recipes);
  }

  addIngredientsToShoppingList(recipe: Recipe) {
    this.shoppingListService.addIngredient(...recipe.ingredients);
  }
}
