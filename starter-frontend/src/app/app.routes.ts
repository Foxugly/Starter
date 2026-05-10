import {Routes} from '@angular/router';

import {authGuard} from './guards/auth.guard';
import {superuserGuard} from './guards/superuser.guard';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  // Public pages
  {path: 'home', loadComponent: () => import('./pages/public/home/home').then((m) => m.Home)},
  {path: 'features', loadComponent: () => import('./pages/public/features/features').then((m) => m.Features)},
  {path: 'donate', loadComponent: () => import('./pages/public/donate/donate').then((m) => m.Donate)},
  {path: 'about', loadComponent: () => import('./pages/public/about/about').then((m) => m.About)},

  // Auth
  {path: 'login', loadComponent: () => import('./pages/auth/login/login').then((m) => m.LoginPage)},
  {path: 'register', loadComponent: () => import('./pages/auth/register/register').then((m) => m.Register)},
  {path: 'register/confirmation', loadComponent: () => import('./pages/auth/register-pending/register-pending').then((m) => m.RegisterPendingPage)},
  {path: 'reset-password', loadComponent: () => import('./pages/auth/reset-password/reset-password').then((m) => m.ResetPassword)},
  {path: 'user/reset-password/:uid/:token', loadComponent: () => import('./pages/auth/reset-password-confirm/reset-password-confirm').then((m) => m.ResetPasswordConfirmPage)},
  {path: 'user/confirm-email/:uid/:token', loadComponent: () => import('./pages/auth/confirm-email/confirm-email').then((m) => m.ConfirmEmailPage)},
  {
    path: 'change-password',
    loadComponent: () => import('./pages/auth/change-password/change-password').then((m) => m.ChangePasswordPage),
    canActivate: [authGuard],
  },
  {
    path: 'preferences',
    loadComponent: () => import('./pages/auth/preferences/preferences').then((m) => m.Preferences),
    canActivate: [authGuard],
  },

  // User admin (superuser only)
  {path: 'user/list', loadComponent: () => import('./pages/user/list/user-list').then((m) => m.UserListPage), canActivate: [authGuard, superuserGuard]},
  {path: 'user/add', loadComponent: () => import('./pages/user/create/user-create').then((m) => m.UserCreatePage), canActivate: [authGuard, superuserGuard]},
  {path: 'user/:id/edit', loadComponent: () => import('./pages/user/edit/user-edit').then((m) => m.UserEditPage), canActivate: [authGuard, superuserGuard]},
  {path: 'user/:id/delete', loadComponent: () => import('./pages/user/delete/user-delete').then((m) => m.UserDeletePage), canActivate: [authGuard, superuserGuard]},
];
