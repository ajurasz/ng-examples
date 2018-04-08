import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes/recipes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(private recipesService: RecipesService) {}

  ngOnInit() {}

  onSave() {
    this.recipesService
      .saveRecipesToRemote()
      .subscribe(response => console.log(response));
  }

  onFetch() {
    this.recipesService.fetchRecipesFromRemote();
  }
}
