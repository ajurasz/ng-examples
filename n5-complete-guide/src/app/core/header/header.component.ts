import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../recipes/recipes.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private recipesService: RecipesService,
    private router: Router
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
    this.authService
      .logout()
      .subscribe(value => this.router.navigateByUrl('/signin'));
  }

  isAuthenticated() {
    return this.authService.authenticated();
  }
}
