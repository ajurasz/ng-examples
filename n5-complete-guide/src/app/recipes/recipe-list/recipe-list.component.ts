import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output('itemSelected') itemSelectedEvent = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
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

  constructor() {
    const i = 10;
  }

  ngOnInit() {
    // this.itemSelectedEvent.emit(this.recipes[0]);
  }

  onItemClicked(recipe: Recipe) {
    this.itemSelectedEvent.emit(recipe);
  }
}
