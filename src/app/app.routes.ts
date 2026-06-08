import { Routes } from '@angular/router';
import { First } from './features/first/first';
import { SignInComponent } from './features/auth/sign-in/sign-in';
import { SignUpComponent } from './features/auth/sign-up/sign-up';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'first', component: First },
  { path: '**', redirectTo: 'sign-in' }
];
