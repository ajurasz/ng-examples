import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import * as fromApp from '../../app.reducers';
import * as fromRecipe from '../store/recipe.reducers';
import { AddIngredientsAction } from '../../shopping-list/store/shopping-list.actions';
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
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    // const id = +this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.store
        .select(fromRecipe.getRecipe(this.id))
        .pipe(take(1))
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
