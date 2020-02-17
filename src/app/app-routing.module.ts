import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AuthGuard } from './authentication/guards/auth.guard';
import { AuthenticationModule } from './authentication/authentication.module';
import { HeroManagementComponent } from './hero/hero-management/hero-management.component';
import { HeroDashboardComponent } from './hero/hero-dashboard/hero-dashboard.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'management', component: HeroManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard', component: HeroDashboardComponent,
  },
  {
    path: '', pathMatch: 'full', redirectTo: '/dashboard',
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    AuthenticationModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
