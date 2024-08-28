import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styles: ``,
})
export class ListUsersComponent implements OnInit {
  statusnotification: boolean = false;
  notificationTitle: string = '';
  notificationMessage: string = '';
  notificationType: string = '';
  isLoading: boolean = false;

  excelData: any = [];
  constructor() {}
  ngOnInit(): void {
    console.log('hola');
  }

  // readExcel(event: any) {
  //   let file = event.target.files[0];
  //   const allowedExtensions = /(\.xls|\.xlsx)$/i;
  //   if (!allowedExtensions.exec(file.name)) {
  //     console.error('El archivo seleccionado no es un archivo de Excel.');

  //     this.showNotification(
  //       'Error',
  //       'El archivo seleccionado no es un archivo de Excel.',
  //       'error'
  //     );

  //     return;
  //   }

  //   let fileReader = new FileReader();
  //   fileReader.readAsBinaryString(file);

  //   fileReader.onload = (e: any) => {
  //     const worBook: XLSX.WorkBook = XLSX.read(fileReader.result, {
  //       type: 'binary',
  //     });

  //     const sheetNmes = worBook.SheetNames;
  //     this.excelData = XLSX.utils.sheet_to_json(worBook.Sheets[sheetNmes[0]]);

  //     console.log(this.excelData);
  //     console.log('hola');
  //   };
  // }

  readExcel(event: any) {
    this.isLoading = true; // Activa el spinner de carga

    let file = event.target.files[0];
    const allowedExtensions = /(\.xls|\.xlsx)$/i;

    if (!allowedExtensions.exec(file.name)) {
      console.error('El archivo seleccionado no es un archivo de Excel.');
      this.showNotification(
        'Error',
        'El archivo seleccionado no es un archivo de Excel.',
        'error'
      );
      this.isLoading = false;
      return;
    }
    this.excelData = [];

    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e: any) => {
      const worBook: XLSX.WorkBook = XLSX.read(fileReader.result, {
        type: 'binary',
      });

      const sheetNames = worBook.SheetNames;
      const worksheet = worBook.Sheets[sheetNames[0]];

      this.excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const headers = this.excelData[0] as string[];

      // Normalize headers by trimming spaces and converting to uppercase
      const normalizedHeaders = headers.map((header) =>
        header.trim().toUpperCase()
      );
      this.excelData.shift();

      const requiredHeaders = ['NOMBRE', 'EMAIL', 'CURSO', 'ESTADO'];
      const isValid = requiredHeaders.every((header) =>
        normalizedHeaders.includes(header)
      );

      if (!isValid) {
        console.error('El archivo no contiene las columnas requeridas.');
        this.showNotification(
          'Error',
          'El archivo no contiene las columnas requeridas.',
          'error'
        );
        return;
      }

      console.log('El archivo es válido:', this.excelData);
      console.log('hola');
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);

      // Restablecer el valor del input después de procesar el archivo
      event.target.value = '';
    };
  }

  showNotification(title: string, message: string, type: string) {
    this.statusnotification = true;
    this.notificationTitle = title;
    this.notificationMessage = message;
    this.notificationType = type;

    setTimeout(() => {
      this.statusnotification = false;
    }, 3000);
  }
}
