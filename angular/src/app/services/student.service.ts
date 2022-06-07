import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, catchError, Observable, of, tap } from "rxjs";
import { Student } from "../model/student.model"
import {Grade} from "../model/grade";

const httpOptions = {
  headers: new HttpHeaders({'content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentsUrl = 'http://localhost:8080/student';

  constructor(private http: HttpClient) { }

  public totalItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl);
  }

  getStudent(id: number): Observable<Student> {
    const url = `${this.studentsUrl}/${id}`;
    return this.http.get<Student>(url).pipe(
      tap(),
      catchError(this.handleError<Student>(`getStudent id=${id}`))
    );
  }

  getGradeForCourse(code : string , username : string) : Observable<Grade[]> {
    const url = `${this.studentsUrl}/grade/${code}/${username}`;
    return this.http.get<Grade[]>(url).pipe(
      tap(),
      catchError(this.handleError<Grade[]>(`getGrade`))
    );
  }

  getStudentByUsername(username: string): Observable<Student> {
    const url = `${this.studentsUrl}/byUsername/${username}`;
    return this.http.get<Student>(url).pipe(
      tap( _=>_),
      catchError(this.handleError<Student>(`getStudentByUsername username = ${username}`))
    );
  }

  addGrade(student : Student, grade : Grade) : Observable<any> {
    const gradeUrl = `${this.studentsUrl}/addGrade/${grade.course.code}/${student.id}`;
    return this.http.patch(gradeUrl, grade, httpOptions);
  }

  deleteGrade(gradeId : number, studentId : number): Observable<any> {
    const url = `${this.studentsUrl}/grade/${gradeId}/${studentId}`;
    return this.http.delete<any>(url, httpOptions).pipe(
      tap(),
      catchError(this.handleError<any>('deleteGrade'))
    );
  }

  deleteStudent(id:  number): Observable<any> {
    const url = `${this.studentsUrl}/${id}`;
    return this.http.delete<Student>(url, httpOptions).pipe(
      tap(),
      catchError(this.handleError<Student>('deleteStudent'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed : ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('StudentService: ' + message);
  }

}
