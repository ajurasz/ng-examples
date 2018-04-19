import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../recipes/recipes.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private recipesService: RecipesService
  ) {}

  ngOnInit() {}

  onSave() {
    this.recipesService
      .saveRecipesToRemote()
      .subscribe(response => console.log(response));
  }

  onFetch() {
    this.recipesService.fetchRecipesFromRemote();
  }

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.authenticated();
  }
}
