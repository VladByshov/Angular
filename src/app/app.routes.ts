import { Routes } from '@angular/router';
import { First } from './features/first/first';
import { SignIn } from './features/auth/sign-in/sign-in';
import { SignUp } from './features/auth/sign-up/sign-up';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
  { path: 'sign-in', component: SignIn },
  { path: 'sign-up', component: SignUp },
  { path: 'first', component: First, canActivate: [authGuard] },
  { path: '**', redirectTo: 'sign-in' }
];
