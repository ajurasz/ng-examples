import { Ingredient } from '../shared/ingredient.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export class ShoppingListService {
  private ingredientsSubject: BehaviorSubject<
    Ingredient[]
  > = new BehaviorSubject([
    new Ingredient('tomato', 2),
    new Ingredient('potato', 10)
  ]);

  constructor() {}

  getIngredients(): Observable<Ingredient[]> {
    return this.ingredientsSubject.asObservable();
  }

  addIngredient(...ingredients: Ingredient[]) {
    this.ingredientsSubject.next(
      this.ingredientsSubject.getValue().concat(ingredients)
    );
  }
}