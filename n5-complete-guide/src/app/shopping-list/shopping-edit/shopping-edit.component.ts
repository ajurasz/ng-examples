import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ngForm: NgForm;

  private editIngredientSubscription: Subscription;
  positiveNumbersPattern = '^[1-9]+[0-9]*$';
  editMode = this.resetEditMode();

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.editIngredientSubscription = this.shoppingListService
      .editIngredientObservable()
      .subscribe((index: number) => {
        this.editMode = [true, index];
        const ingredient = this.shoppingListService.getIngredient(index);
        this.ngForm.setValue({
          name: ingredient.name,
          amount: ingredient.amount
        });
      });
  }

  ngOnDestroy() {
    this.editIngredientSubscription.unsubscribe();
  }

  onSubmit() {
    const values = this.ngForm.value;
    const ingredient = new Ingredient(values.name, values.amount);
    if (this.editMode[0]) {
      this.shoppingListService.updateIngredient(+this.editMode[1], ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
      this.onClear();
    }
  }

  onDelete() {
    if (this.editMode[0]) {
      this.shoppingListService.removeIngredient(this.editMode[1]);
      this.onClear();
    }
  }

  onClear() {
    this.editMode = this.resetEditMode();
    this.ngForm.reset();
  }

  private resetEditMode(): Array<any> {
    return [false, -1];
  }
}
