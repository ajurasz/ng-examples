import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import * as fromApp from '../../app.reducers';
import * as fromShoppingList from '../store/shopping-list.reducers';
import {
  StopEditAction,
  RemoveIngredientAction,
  UpdateIngredientAction,
  AddIngredientsAction,
  StartEditAction
} from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ngForm: NgForm;

  subscription: Subscription;
  positiveNumbersPattern = '^[1-9]+[0-9]*$';
  editMode = false;
  editedItem: Ingredient = null;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    console.log(this.ngForm);
    this.subscription = this.store
      .select(fromShoppingList.getEditedItem)
      .subscribe(data => {
        console.log(data);
        if (data.editedIngredient) {
          this.editMode = true;
          this.editedItem = data.editedIngredient;
          this.ngForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode = false;
          this.editedItem = null;
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new StopEditAction());
  }

  onSubmit() {
    const values = this.ngForm.value;
    const ingredient = new Ingredient(values.name, values.amount);
    if (this.editMode) {
      this.store.dispatch(new UpdateIngredientAction(ingredient));
    } else {
      this.store.dispatch(new AddIngredientsAction([ingredient]));
      this.onClear();
    }
  }

  onDelete() {
    if (this.editMode) {
      this.store.dispatch(new RemoveIngredientAction());
      this.onClear();
    }
  }

  onClear() {
    if (this.editMode) {
      this.store.dispatch(new StopEditAction());
    }
    this.ngForm.reset();
  }
}
