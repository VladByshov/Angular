import { Routes } from '@angular/router';
import { First } from './features/first/first';
import { SignIn } from './features/auth/sign-in/sign-in';
import { SignUp } from './features/auth/sign-up/sign-up';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'first' },
  { path: 'sign-in', component: SignIn, canActivate: [guestGuard] },
  { path: 'sign-up', component: SignUp, canActivate: [guestGuard] },
  { path: 'first', component: First, canActivate: [authGuard] },
  { path: '**', redirectTo: 'first' }
];
