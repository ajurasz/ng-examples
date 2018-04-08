import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  id: number;
  recipe: Recipe;

  constructor(
    private recipiesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // const id = +this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipiesService.getRecipe(this.id);
    });
  }

  onAddToShoppingList() {
    this.recipiesService.addIngredientsToShoppingList(this.recipe);
  }

  onDelete() {
    this.recipiesService.deleteRecipe(this.id);
    this.router.navigateByUrl('/recipes');
  }
}
