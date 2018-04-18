import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import * as fromApp from '../../app.reducers';
import * as fromRecipe from '../store/recipe.reducers';
import { AddIngredientsAction } from '../../shopping-list/store/shopping-list.actions';
import { take, flatMap, filter } from 'rxjs/operators';
import { DeleteRecipeAction } from '../store/recipe.actions';

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
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    // const id = +this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.store
        .select(fromRecipe.getRecipes)
        .pipe(take(1), flatMap(v => v), filter((_, index) => index === this.id))
        .subscribe(recipe => (this.recipe = recipe));
    });
  }

  onAddToShoppingList() {
    this.store.dispatch(new AddIngredientsAction(this.recipe.ingredients));
  }

  onDelete() {
    this.store.dispatch(new DeleteRecipeAction(this.id));
    this.router.navigateByUrl('/recipes');
  }
}
