import { Component, Input, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-view-answer',
  templateUrl: './dashboard-view-answer.component.html',
  styles: ``,
})
export class DashboardViewAnswerComponent implements OnInit {
  @Input() quizList: any[] = [];
  @Input() subject: string = '';
  ngOnInit(): void {}
}
