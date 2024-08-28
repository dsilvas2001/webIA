import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styles: ``,
})
export class WelcomeComponent implements OnInit {
  statusnotification: boolean = false;

  ngOnInit(): void {
    if (localStorage.getItem('prueba') === 'true') {
      this.statusnotification = true;
      localStorage.setItem('prueba', 'false');
    }
  }
}
