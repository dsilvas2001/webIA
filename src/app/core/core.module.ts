import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { loggingInterceptor } from './interceptors/logging.interceptor';
import { errorHandlingInterceptor } from './interceptors/error-handling.interceptor';

@NgModule({
  declarations: [],

  imports: [CommonModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: loggingInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: errorHandlingInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
