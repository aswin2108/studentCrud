import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StudentData } from 'src/app/interfaces/studentData';

@Injectable({
  providedIn: 'root',
})
export class studentService {
  private apiUrl = 'https://65a8cad1219bfa3718679841.mockapi.io/demmo/users';

  constructor(private http: HttpClient) {}

  getData(): Observable<StudentData> {
    return this.http.get<StudentData>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching data:', error);
        throw error;
      })
    );
  }

  getOneStudent(id:number):Observable<StudentData>{
    return this.http.get<StudentData>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching data:', error);
        throw error;
      })
    );
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting student:', error);
        throw error;
      })
    );
  }
}
