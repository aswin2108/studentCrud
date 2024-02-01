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


/**
 * To get all the data
 * @returns All the data existing in the table at that point of time
 */
  getData(): Observable<StudentData> {
    return this.http.get<StudentData>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching data:', error);
        throw error;
      })
    );
  }

  /**
   * To get data of one student
   * @param id - Any number, existing ones
   * @returns - Data of one student
   */
  getOneStudent(id:number):Observable<StudentData>{
    return this.http.get<StudentData>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching data:', error);
        throw error;
      })
    );
  }

  /**
   * Deletes an entry from the table
   * @param id - Any number, existing ones
   * @returns Navigates us to a new table
   */
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting student:', error);
        throw error;
      })
    );
  }

  /**
   * Updates details of a particular student
   * @param student - Custom defined interface having all data related to a student
   * @returns Navigates us to the updated profile
   */
  updateStudentDetails(student: StudentData): Observable<StudentData> {
    return this.http.put<StudentData>(`${this.apiUrl}/${student.id}`, student).pipe(
      catchError((error) => {
        console.error('Error updating student details:', error);
        throw error;
      })
    );
  }


/**
 * To add a new student details to the table
 * @param newStudent New student data passed in StudentData format
 * @returns navigates to the list with newly added student
 */
  addStudent(newStudent: StudentData): Observable<StudentData> {
    return this.http.post<StudentData>(this.apiUrl, newStudent).pipe(
      catchError((error) => {
        console.error('Error adding student:', error);
        throw error;
      })
    );
  }
}
