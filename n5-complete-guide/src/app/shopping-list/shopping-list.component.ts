import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('tomato', 2),
    new Ingredient('potato', 10)
  ];

  constructor() {}

  ngOnInit() {}

  onNewIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
