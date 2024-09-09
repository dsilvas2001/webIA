import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-dashboard-quiz',
  templateUrl: './dashboard-quiz.component.html',
  styles: ``,
})
export class DashboardQuizComponent implements OnInit {
  statusModal: boolean = false;
  statusnotification: boolean = false;
  notificationTitle: string = '';
  notificationMessage: string = '';
  notificationType: string = '';
  isLoading: boolean = false;
  /**
   *
   */
  subject: string = '';
  topic: string = 'TEMA:';
  numOptions: string = '';
  numQuestions: string = '';

  /**
   *
   *
   */
  quizList: any[] = [];
  activeTab: string = 'quiz'; // Tab activa por defecto

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  openModal() {
    this.statusModal = true;
    console.log('Modal abierto:', this.statusModal);
  }

  closeModal() {
    this.statusModal = false;
    console.log('Modal cerrado:', this.statusModal);
  }

  onQuizReceived(quizDto: any) {
    this.isLoading = true;
    const { subject, topic } = quizDto;
    this.topic = topic;
    this.subject = subject;

    this.authService.generateText(quizDto).subscribe(
      (data: any) => {
        // Si response es un objeto, lo convertimos a un array para manejarlo uniformemente
        this.quizList = Array.isArray(data) ? data : [data];

        // Accede a la primera pregunta del primer quiz
        if (this.quizList.length > 0 && this.quizList[0].questions.length > 0) {
          const firstQuestion = this.quizList[0].questions[0].question;
          console.log('Primera pregunta del primer quiz:', firstQuestion);
        } else {
          console.error('No hay preguntas en el quiz.');
        }

        this.isLoading = false;
      },
      (error) => {
        console.error('Error sending quiz data:', error);
        this.isLoading = false;
      }
    );
  }
}
