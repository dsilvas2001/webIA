import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-previus-quiz',
  templateUrl: './dashboard-previus-quiz.component.html',
  styles: ``,
})
export class DashboardPreviusQuizComponent implements OnInit {
  @Input() quizList: any[] = [];
  @Input() subject: string = '';
  selectedOptions: string[] = []; // Arreglo para almacenar la opción seleccionada para cada pregunta

  selectOption(option: string, questionIndex: number) {
    this.selectedOptions[questionIndex] = option;
  }

  ngOnInit(): void {}
}
