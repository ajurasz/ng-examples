import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { Ingredient } from '../shared/ingredient.model';
import * as fromApp from '../app.reducers';
import * as fromShoppingList from './store/shopping-list.reducers';
import { StartEditAction } from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients$: Observable<Ingredient[]>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.ingredients$ = this.store
      .select(fromShoppingList.getIngredients)
      .pipe(tap(_ => console.log(_)));
  }

  onClick(index: number) {
    this.store.dispatch(new StartEditAction(index));
  }
}
