import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private recipiesService: RecipesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // const id = +this.route.snapshot.params['id'];
    this.route.params.subscribe(
      (params: Params) =>
        (this.recipe = this.recipiesService.getRecipe(+params['id']))
    );
  }

  onAddToShoppingList() {
    this.recipiesService.addIngredientsToShoppingList(this.recipe);
  }
}
