import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/exampleSecurity/user';
  private adminUrl = 'http://localhost:8080/exampleSecurity/admin';
  private studentUrl = 'http://localhost:8080/exampleSecurity/student';
  private teacherUrl = 'http://localhost:8080/exampleSecurity/teacher';

  constructor(private http: HttpClient) { }

  getUserPage(): Observable<string> {
    return this.http.get(this.userUrl, { responseType: 'text' });
  }

  getAdminPage(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }

  getStudentPage(): Observable<string> {
    return this.http.get(this.studentUrl, { responseType: 'text' });
  }

  getTeacherPage(): Observable<string> {
    return this.http.get(this.teacherUrl, { responseType: 'text' });
  }

}
