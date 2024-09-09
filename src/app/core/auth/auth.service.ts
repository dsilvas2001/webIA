import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../assets/environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private apiUrl = `${environment.domain}`;
  private API_PATH = `/user/`;
  private COURSE_API_PATH = `/curso/`;
  private OPENAI = `/openAI/`;

  getDecodedToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  getUserId(): string | null {
    const token = localStorage.getItem('token'); // Obtén el token desde localStorage o donde lo guardes
    if (token) {
      const decodedToken = this.getDecodedToken(token);
      return decodedToken ? decodedToken.id : null; // Accede al ID
    }
    return null;
  }
  getUserEmail(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.getDecodedToken(token);
      return decodedToken ? decodedToken.email : null; // Accede al email si está presente
    }
    return null;
  }

  /**
   *
   * @param userData
   * @returns
   */

  registerUser(userData: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}${this.API_PATH}register/`,
      userData
    );
  }

  loginUser(userData: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${this.API_PATH}auth/`, userData);
  }

  getCountUser(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}${this.API_PATH}count/`);
  }

  getAllUser(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}${this.API_PATH}`);
  }

  getByIdUser(userId: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}${this.API_PATH}${userId}`);
  }

  /**
   *
   * @returns
   */
  getAllCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}${this.COURSE_API_PATH}`);
  }
  getCountCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}${this.COURSE_API_PATH}count/`);
  }

  /**
   *
   * @param quizData
   * @returnsw
   */

  generateText(quizData: {
    numOptions: string;
    numQuestions: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${this.OPENAI}prompt`, quizData);
  }
}
