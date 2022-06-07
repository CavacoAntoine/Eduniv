import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, tap} from "rxjs";
import {Course} from "../model/course.model";
import {Teacher} from "../model/teacher.model";
import {Student} from "../model/student.model";

const httpOptions = {
  headers: new HttpHeaders({'content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courseUrl = 'http://localhost:8080/course';

  constructor(private http: HttpClient) { }

  public totalItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  getCourses() : Observable<Course[]> {
    return this.http.get<Course[]>(this.courseUrl);
  }

  getCourse(code : string) : Observable<Course> {
    const codeUrl = `${this.courseUrl}/${code}`;
    return this.http.get<Course>(codeUrl);
  }

  getCoursesForTeacher(teacher : Teacher) : Observable<Course[]> {
    const teacherUrl = `${this.courseUrl}/teacher/${teacher.id}` ;
    return this.http.get<Course[]>(teacherUrl).pipe(
      _=> _,
      catchError(this.handleError<any>('getCoursesForTeacher'))
    );
  }

  getCoursesForStudent(student : Student) : Observable<Course[]> {
    const studentUrl = `${this.courseUrl}/student/${student.id}` ;
    return this.http.get<Course[]>(studentUrl).pipe(
      _=> _,
      catchError(this.handleError<any>('getCoursesForStudent'))
    );
  }

  updateCourse(course : Course) : Observable<any> {
    const url = `${this.courseUrl}/${course.code}`;
    return this.http.patch(url, course, httpOptions);
  }

  addStudentToCourse(student : Student, course : Course) : Observable<any> {
    const url = `${this.courseUrl}/addStudent/${course.code}`;
    return this.http.patch(url, student, httpOptions);
  }

  addCourse(course : Course) : Observable<Course> {
    return this.http.post<Course>(this.courseUrl, course, httpOptions);
  }

  deleteCourse(code : string) : Observable<any> {
    const url = `${this.courseUrl}/${code}`;
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
    console.log('CourseService: ' + message);
  }

}
