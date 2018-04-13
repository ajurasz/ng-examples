import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutesModule } from './app-routes.module';
import { RecipesService } from './recipes/recipes.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutesModule,
    HttpModule,
    RecipesModule,
    ShoppingListModule,
    SharedModule,
    AuthModule
  ],
  providers: [RecipesService, ShoppingListService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
