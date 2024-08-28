import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PruebaRoutingModule } from './prueba-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardModule } from '../dashboard/dashboard.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, PruebaRoutingModule, DashboardModule],
})
export class PruebaModule {}
