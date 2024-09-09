import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardResolver implements Resolve<any> {
  constructor(private authServices: AuthService) {}

  resolve(): Observable<any> {
    return forkJoin({
      count_user: this.authServices.getCountUser(),
      courses: this.authServices.getCountCourses(),
    });
  }
}
