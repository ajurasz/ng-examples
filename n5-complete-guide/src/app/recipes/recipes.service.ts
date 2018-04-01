import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipesService {
  itemSelectedEvent = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'Recipe test description',
      'https://cdn3.tmbi.com/secure/RMS/attachments/37/300x300/Cheesy-Cheddar-Broccoli-Casserole_EXPS_SDFM17_28900_C09_30_6b.jpg'
    ),
    new Recipe(
      'Another Test Recipe',
      'Recipe test description',
      'https://cdn3.tmbi.com/secure/RMS/attachments/37/300x300/Cheesy-Cheddar-Broccoli-Casserole_EXPS_SDFM17_28900_C09_30_6b.jpg'
    )
  ];

  constructor() {}

  getRecipes() {
    return this.recipes.slice();
  }
}
