import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppRoutesModule } from '../app-routes.module';
import { AuthService } from '../auth/auth.service';
import { SharedModule } from './../shared/shared.module';
import { AuthInterceptor } from '../shared/auth.interceptor';

@NgModule({
  declarations: [HeaderComponent, HomeComponent],
  imports: [SharedModule, AppRoutesModule],
  exports: [HeaderComponent, AppRoutesModule],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class CoreModule {}
