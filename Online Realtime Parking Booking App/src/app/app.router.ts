import { RouterModule, Routes} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import {AuthGuard} from './Services/authGuard'

import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {BookingformComponent} from './bookingform/bookingform.component';
import {BookinglistComponent} from './bookinglist/bookinglist.component';
import {FeedbackformComponent} from './feedbackform/feedbackform.component';
import {MessagesComponent} from './messages/messages.component';


export const routes: Routes = [
 { path: '' , redirectTo: 'login' , pathMatch: 'full' },
 { path: 'login' , component: LoginComponent },
 { path: 'signup' , component: SignupComponent },
 { path: 'bookingform' , component: BookingformComponent,
canActivate:[AuthGuard] },
 { path: 'bookinglist' , component: BookinglistComponent,
canActivate:[AuthGuard] },
 { path: 'feedback' , component: FeedbackformComponent,
canActivate:[AuthGuard] },
 { path: 'messages' , component: MessagesComponent,
canActivate:[AuthGuard] },
];

 export const router: ModuleWithProviders = RouterModule.forRoot(routes)
 