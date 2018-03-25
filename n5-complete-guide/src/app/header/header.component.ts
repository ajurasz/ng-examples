import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Page } from '../shared/page.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Output('pageChange') pageChangeEvent = new EventEmitter<Page>();

  constructor() {}

  ngOnInit() {}

  onRecipeLinkClick() {
    console.log('recipe link clicked');
    this.pageChangeEvent.emit(Page.RECIPE);
  }

  onShoppingListLinkClick() {
    console.log('shopping list link clicked');
    this.pageChangeEvent.emit(Page.SHOPPING_LIST);
  }
}
