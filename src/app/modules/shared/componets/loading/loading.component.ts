import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styles: ``,
})
export class LoadingComponent implements OnInit {
  constructor(private router: Router, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.router.navigate(['/Dashboard/dashboard-home']);

      this.spinner.hide();
    }, 2000);
  }
}
