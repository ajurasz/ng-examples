import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormArray,
  AbstractControl,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { RecipesService } from '../recipes.service';
import { Ingredient } from '../../shared/ingredient.model';

import * as fromRecipe from '../store/recipe.reducers';
import { AddRecipeAndRedirectAction } from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipesService,
    private store: Store<fromRecipe.State>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      console.log(this.editMode);
      this.initForm();
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.store.dispatch(
        new AddRecipeAndRedirectAction(this.recipeForm.value)
      );
      // const newId = this.recipeService.addRecipe(this.recipeForm.value);
      // this.router.navigate(['/', 'recipes', newId]);
    }
  }

  onCancel() {
    this.router.navigateByUrl('/recipes');
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern('^[1-9]+[0-9]*$')
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm() {
    let name = '';
    let imgPath = '';
    let desc = '';
    let ingredients: Ingredient[] = [];

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      name = recipe.name;
      imgPath = recipe.imagePath;
      desc = recipe.description;
      ingredients = recipe.ingredients;
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      imagePath: new FormControl(imgPath, Validators.required),
      description: new FormControl(desc, Validators.required),
      ingredients: new FormArray(
        ingredients.map(
          ingredient =>
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern('^[1-9]+[0-9]*$')
              ])
            })
        )
      )
    });
  }
}
