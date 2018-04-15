import * as fromShoppingList from './shopping-list/store/shopping-list.reducers';

export interface AppState {
  shoppingList: fromShoppingList.State;
}
