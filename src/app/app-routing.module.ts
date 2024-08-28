import { PruebaModule } from './modules/prueba/prueba.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './modules/auth/auth.module';
import { HomeModule } from './modules/home/home.module';
import { DashboardHomeComponent } from './modules/dashboard/pages/dashboard-home/dashboard-home.component';
import { LoadingComponent } from './modules/shared/componets/loading/loading.component';

const routes: Routes = [
  {
    path: 'Auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'Dashboard',
    loadChildren: () =>
      import('././modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'Prueba',
    loadChildren: () =>
      import('././modules/prueba/prueba.module').then((m) => m.PruebaModule),
  },
  {
    path: 'Websites',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'loading',
    component: LoadingComponent,
  },
  {
    path: '**',
    redirectTo: 'Websites',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
