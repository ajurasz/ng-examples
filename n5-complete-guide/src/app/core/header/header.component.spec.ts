import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';

import { of } from 'rxjs/observable/of';

import * as fromRecipe from '../../recipes/store/recipe.reducers';
import { HeaderComponent } from './header.component';
import { routes } from '../../auth/auth.module';
import { AuthService } from '../../auth/auth.service';
import { SignupComponent } from '../../auth/signup/signup.component';
import { SigninComponent } from '../../auth/signin/signin.component';
import { FormsModule } from '@angular/forms';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let compiled: HTMLElement;
  let location: Location;
  let router: Router;
  let store: Store<fromRecipe.State>;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, SignupComponent, SigninComponent],
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes(routes),
        StoreModule.forRoot({ ...fromRecipe.reduce })
      ],
      providers: [AuthService]
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    store = TestBed.get(Store);
    authService = TestBed.get(AuthService);

    router.initialNavigation();
  });

  it('should create header', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct naviagation for logged in user', () => {
    spyOn(authService, 'authenticated').and.returnValue(of(true));
    fixture.detectChanges();
    const link = compiled.querySelector('.navbar-nav.ml-auto a.nav-link');
    expect(link.textContent).toEqual('Logout');
  });

  it('should display correct naviagation for not logged in user', () => {
    spyOn(authService, 'authenticated').and.returnValue(of(false));
    fixture.detectChanges();
    const links = compiled.querySelectorAll('.navbar-nav.ml-auto a.nav-link');
    expect(links.item(0).textContent).toEqual('Register');
    expect(links.item(1).textContent).toEqual('Login');
  });

  it('should point to /sigup url', () => {
    spyOn(authService, 'authenticated').and.returnValue(of(false));
    fixture.detectChanges();
    const href = compiled
      .querySelectorAll('.navbar-nav.ml-auto a.nav-link')
      .item(0)
      .getAttribute('href');
    expect(href).toBe('/signup');
  });

  it('should point to /sigin url', () => {
    spyOn(authService, 'authenticated').and.returnValue(of(false));
    fixture.detectChanges();
    const href = compiled
      .querySelectorAll('.navbar-nav.ml-auto a.nav-link')
      .item(1)
      .getAttribute('href');
    expect(href).toBe('/signin');
  });
});
