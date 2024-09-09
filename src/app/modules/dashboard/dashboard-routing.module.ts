import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { DashboardResolver } from './dashboard-resolver';
import { DashboardQuizComponent } from './pages/dashboard-quiz/dashboard-quiz.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard-home',
        component: DashboardHomeComponent,
        children: [
          {
            path: '',
            component: WelcomeComponent,
            resolve: {
              data: DashboardResolver,
            },
          },
          {
            path: 'list-user',
            component: ListUsersComponent,
          },
          {
            path: 'quiz',
            component: DashboardQuizComponent,
          },
        ],
      },

      { path: '**', redirectTo: 'dashboard-home' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
