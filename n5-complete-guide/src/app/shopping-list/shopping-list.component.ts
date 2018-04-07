import { Component, OnInit, OnDestroy } from '@angular/core';

import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredientsSubscription: Subscription;
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredientsSubscription = this.shoppingListService
      .getIngredients()
      .subscribe(
        (ingredients: Ingredient[]) => (this.ingredients = ingredients)
      );
  }

  onClick(index: number) {
    this.shoppingListService.startEditIngredient(index);
  }

  ngOnDestroy() {
    this.ingredientsSubscription.unsubscribe();
  }
}
