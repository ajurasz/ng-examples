import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipesSubscription: Subscription;

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.recipesSubscription = this.recipesService.getRecipes().subscribe(
      recipes => this.recipes = recipes
    );
  }

  ngOnDestroy() {
    this.recipesSubscription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
