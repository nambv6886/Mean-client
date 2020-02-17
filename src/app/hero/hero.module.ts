import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroService } from './hero.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeroManagementComponent } from './hero-management/hero-management.component';
import { HeroDashboardComponent } from './hero-dashboard/hero-dashboard.component';



@NgModule({
  declarations: [
    HeroListComponent,
    HeroDetailComponent,
    HeroManagementComponent,
    HeroDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    HeroService
  ]
})
export class HeroModule { }
