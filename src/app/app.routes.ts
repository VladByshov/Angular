import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { Players } from './features/dashboard/players/players';
import { Teams } from './features/dashboard/teams/teams';
import { Accounts } from './features/dashboard/accounts/accounts';
import { SignIn } from './features/auth/sign-in/sign-in';
import { SignUp } from './features/auth/sign-up/sign-up';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'sign-in', component: SignIn, canActivate: [guestGuard] },
  { path: 'sign-up', component: SignUp, canActivate: [guestGuard] },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'players' },
      { path: 'players', component: Players },
      { path: 'teams', component: Teams },
      { path: 'accounts', component: Accounts },
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
