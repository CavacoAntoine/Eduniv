import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, tap} from "rxjs";
import {Teacher} from "../model/teacher.model";

const httpOptions = {
  headers: new HttpHeaders({'content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private teacherUrl = 'http://localhost:8080/teacher';

  constructor(private http: HttpClient) { }

  getTeachers() : Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.teacherUrl).pipe(
      tap( _=>_),
      catchError(this.handleError<Teacher[]>(`getTeachers`))
    );
  }

  getTeacherByUsername(username: String): Observable<Teacher> {
    const url = `${this.teacherUrl}/byUsername/${username}`;
    return this.http.get<Teacher>(url).pipe(
      tap( _=>_),
      catchError(this.handleError<Teacher>(`getTeacher username=${username}`))
    );
  }

  deleteTeacher(id : number): Observable<any> {
    const url = `${this.teacherUrl}/${id}`;
    return this.http.delete<any>(url, httpOptions);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed : ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('TeacherService: ' + message);
  }

}
