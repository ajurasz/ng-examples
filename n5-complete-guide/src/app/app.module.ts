import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import * as fromShoppingList from './shopping-list/store/shopping-list.reducers';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    ShoppingListModule,
    AuthModule,
    StoreModule.forRoot({
      shoppingList: fromShoppingList.reduce
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
