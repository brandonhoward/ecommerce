import { CreateUserComponent } from './create-user.component';
import { Error404Component } from './errors/error404.component';
import { Error401Component } from './errors/error401.component';
import { AppInterceptor } from './interceptors/app.interceptor';
import { AppService } from './services/app.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AboutComponent } from './about.component';
import { LoginComponent } from './login.component';
import { LandingComponent } from './landing.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    LandingComponent,
    LoginComponent,
    AboutComponent,
    Error401Component,
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AppService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
