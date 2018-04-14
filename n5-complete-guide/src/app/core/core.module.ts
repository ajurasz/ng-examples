import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppRoutesModule } from '../app-routes.module';
import { RecipesService } from '../recipes/recipes.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { AuthService } from '../auth/auth.service';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent, HomeComponent],
  imports: [SharedModule, AppRoutesModule],
  exports: [HeaderComponent, AppRoutesModule],
  providers: [RecipesService, ShoppingListService, AuthService]
})
export class CoreModule {}
