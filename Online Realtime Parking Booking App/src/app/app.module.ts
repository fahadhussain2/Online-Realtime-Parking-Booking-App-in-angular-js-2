import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {router} from './app.router';
import {HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AngularFireModule, AuthProviders, AuthMethods, AngularFireAuth } from 'angularfire2'; 
import { FormsModule, ReactiveFormsModule,FormBuilder } from '@angular/forms';
import {config, firebaseAuthConfig} from './app.config';
import {UserService} from './Services/userService';
import {AuthGuard} from './Services/authGuard';
import {StoreModule} from './store';
import { NgReduxModule } from 'ng2-redux';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookinglistComponent } from './bookinglist/bookinglist.component';
import { BookingformComponent } from './bookingform/bookingform.component';
import { FeedbackformComponent } from './feedbackform/feedbackform.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    BookinglistComponent,
    BookingformComponent,
    FeedbackformComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    router,
    NgReduxModule,
    StoreModule,
    AngularFireModule.initializeApp(config, firebaseAuthConfig)
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},UserService, AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
