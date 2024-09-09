import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardNavbarComponent } from './components/dashboard-navbar/dashboard-navbar.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { DashboardModalUserComponent } from './components/dashboard-modal-user/dashboard-modal-user.component';
import { DashboardQuizComponent } from './pages/dashboard-quiz/dashboard-quiz.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardResolver } from './dashboard-resolver';
import { DashboardModalGenerateQuizComponent } from './components/dashboard-modal-generate-quiz/dashboard-modal-generate-quiz.component';
import { DashboardViewAnswerComponent } from './components/dashboard-view-answer/dashboard-view-answer.component';
import { DashboardPreviusQuizComponent } from './components/dashboard-previus-quiz/dashboard-previus-quiz.component';

@NgModule({
  declarations: [
    DashboardHomeComponent,
    DashboardSidebarComponent,
    DashboardNavbarComponent,
    ListUsersComponent,
    WelcomeComponent,
    DashboardModalUserComponent,
    DashboardQuizComponent,
    DashboardModalGenerateQuizComponent,
    DashboardViewAnswerComponent,
    DashboardPreviusQuizComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [AuthService, DashboardResolver],

  exports: [DashboardSidebarComponent],
})
export class DashboardModule {}
