import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styles: ``,
})
export class ListUsersComponent implements OnInit {
  statusModal: boolean = false;
  statusnotification: boolean = false;
  notificationTitle: string = '';
  notificationMessage: string = '';
  notificationType: string = '';
  isLoading: boolean = false;
  p: number = 1;

  excelData: any = [];
  users: any[] = [];
  currentDataSource: 'users' | 'excel' = 'users'; // Define la fuente de datos actual

  constructor(private authServices: AuthService) {}
  ngOnInit(): void {
    console.log('hola');
  }

  readExcel(event: any) {
    this.currentDataSource = 'excel';
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
        this.isLoading = false;
        this.excelData = [];

        return;
      }
      this.excelData.shift();

      console.log('El archivo es válido:', this.excelData);
      console.log('hola');
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);

      // Restablecer el valor del input después de procesar el archivo
      event.target.value = '';
    };
  }

  openModal() {
    this.statusModal = true;
    console.log('Modal abierto:', this.statusModal);
  }

  closeModal() {
    this.statusModal = false;
    console.log('Modal cerrado:', this.statusModal);
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

  mostrarUser() {
    this.currentDataSource = 'users';
    this.isLoading = true;
    this.authServices.getAllUser().subscribe(
      (datas: any[]) => {
        this.users = datas; // Almacena los datos en un array
        console.log(this.users); // Opcional: imprime el array completo
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  onUserIdReceived(userId: string) {
    this.currentDataSource = 'users';
    this.isLoading = true;
    this.authServices.getByIdUser(userId).subscribe(
      (data: any) => {
        this.users = Array.isArray(data) ? data : [data]; // Convertir el objeto en un array
        console.log(this.users); // Opcional: imprime el array completo
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.isLoading = false; // Asegúrate de detener la carga en caso de error
      }
    );
  }
}
