import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, tap} from "rxjs";
import {User} from "../model/user.model";

const httpOptions = {
  headers: new HttpHeaders({'content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountUrl = 'http://localhost:8080/user';

  public totalItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) { }


  updateAccount(user : User) : Observable<any> {
    const url = `${this.accountUrl}/${user.id}`;
    return this.http.patch(url, user, httpOptions).pipe(
      tap(),
      catchError(this.handleError<any>('updateAccount'))
    );
  }

  getAccount(id: string): Observable<User> {
    const url = `${this.accountUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(),
      catchError(this.handleError<User>(`getUser id=${id}`))
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
    console.log('AccountService: ' + message);
  }

}
