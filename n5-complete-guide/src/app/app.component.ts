import { Component } from '@angular/core';
import { Page } from './shared/page.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  activePage: Page = Page.RECIPE;

  onPageChange(event: Page) {
    console.log(`onPageChange ${event}`);
    this.activePage = event;
  }

  isRecipePage() {
    return this.activePage === Page.RECIPE;
  }

  isShoppingListPage() {
    return this.activePage === Page.SHOPPING_LIST;
  }
}
