import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEmptyComponent } from './recipe-empty/recipe-empty.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipesRoutesModule } from './recipes-routes.module';
import { SharedModule } from '../shared/shared.module';
import { RecipeEffects } from './store/recipe.effects';
import * as fromRecipe from './store/recipe.reducers';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeEmptyComponent,
    RecipeEditComponent,
    RecipeItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutesModule,
    SharedModule,
    StoreModule.forFeature('recipes', fromRecipe.reduce),
    EffectsModule.forFeature([RecipeEffects])
  ]
})
export class RecipesModule {}
