import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Grade} from "../model/grade";

const httpOptions = {
  headers: new HttpHeaders({'content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  private gradeUrl = 'http://localhost:8080/grade';

  constructor(private http: HttpClient) { }

  updateGrade(grade : Grade) : Observable<any> {
    const url = `${this.gradeUrl}/${grade.id}`;
    return this.http.patch(url, grade, httpOptions);
  }

}
