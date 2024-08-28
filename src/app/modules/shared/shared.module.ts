import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  exports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
})
export class SharedModule {}
