import {
  Directive,
  Renderer2,
  OnInit,
  ElementRef,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('click')
  click(event: Event) {
    const isShown = this.elRef.nativeElement.classList.contains('show');
    const menuElement = this.elRef.nativeElement.querySelector(
      '.dropdown-menu'
    );
    if (isShown) {
      this.renderer.removeClass(this.elRef.nativeElement, 'show');
      this.renderer.removeClass(menuElement, 'show');
    } else {
      this.renderer.addClass(this.elRef.nativeElement, 'show');
      this.renderer.addClass(menuElement, 'show');
    }
  }
}
