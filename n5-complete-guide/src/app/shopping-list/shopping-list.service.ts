import { Ingredient } from '../shared/ingredient.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export class ShoppingListService {
  private ingredientsSubject: BehaviorSubject<
    Ingredient[]
  > = new BehaviorSubject([
    new Ingredient('tomato', 2),
    new Ingredient('potato', 10)
  ]);
  private editIngredientSubject: Subject<number> = new Subject();

  constructor() {}

  getIngredients(): Observable<Ingredient[]> {
    return this.ingredientsSubject.asObservable();
  }

  getIngredient(index: number): Ingredient {
    return this.ingredientsSubject.getValue()[index];
  }

  addIngredient(...ingredients: Ingredient[]) {
    this.ingredientsSubject.next(
      this.ingredientsSubject.getValue().concat(ingredients)
    );
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    const ingredients = this.ingredientsSubject.getValue();
    ingredients[index] = ingredient;
    this.ingredientsSubject.next(ingredients);
  }

  removeIngredient(index: number) {
    const ingredients = this.ingredientsSubject.getValue().filter(
      (ingredient, idx) => {
        if (index !== idx) {
          return ingredient;
        }
      }
    );
    this.ingredientsSubject.next(ingredients);
  }

  startEditIngredient(index: number) {
    this.editIngredientSubject.next(index);
  }

  editIngredientObservable(): Observable<number> {
    return this.editIngredientSubject.asObservable();
  }
}
