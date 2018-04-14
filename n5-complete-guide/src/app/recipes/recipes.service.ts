import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { flatMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipesService {
  readonly RECIPES_DB_URL = environment.recipes_db_url;

  private recipesSubject: BehaviorSubject<Recipe[]> = new BehaviorSubject<
    Recipe[]
  >([
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
  ]);

  constructor(
    private shoppingListService: ShoppingListService,
    private httpClient: HttpClient
  ) {}

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
    const recipes = this.recipesSubject.getValue().filter((recipe, index) => {
      if (index !== id) {
        return recipe;
      }
    });
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
