import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store, StoreModule, combineReducers } from '@ngrx/store';

import { AppComponent } from './app.component';
import * as fromApp from './app.reducers';
import { InitAuthAction } from './auth/store/auth.actions';
import { AppService } from './app.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let store: Store<fromApp.AppState>;
  let appService: AppService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromApp.reducers
        })
      ],
      providers: [AppService],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    appService = TestBed.get(AppService);
    spyOn(appService, 'initFirebise').and.callFake(() => {
      console.log('fake initFirebise');
    });
    spyOn(appService, 'onAuthStateChange').and.callFake(fn => {
      console.log('fake onAuthStateChange');
      fn('user');
    });
    fixture.detectChanges();
  }));

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should dispatch InitAuthAction', async(() => {
    const action = new InitAuthAction();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  }));

  it('should render router-outlet tag', async(() => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  }));
});
