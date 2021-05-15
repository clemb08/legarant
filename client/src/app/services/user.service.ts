import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError} from 'rxjs/operators';
import { Observable, throwError, Subscription } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  httpHeader = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  getContactById(id): Observable<User> {
    
    return this.httpClient.get<User>(this.endpoint + `/contact/${id}`, { headers: this.httpHeader, responseType: "json" })
    .pipe(
      retry(1),
      catchError(this.handleError) // then handle the error
    )
  }

  updateContact(id, user): Observable<User> {
    console.log(id);
    return this.httpClient.put<User>(`${this.endpoint}/contact/${id}`, 
    { 
      name: user.nameForm,
      username: user.usernameForm,
      title: user.titleForm,
      email: user.emailForm,
      phone: user.phoneForm,
      mobile: user.mobileForm
    },
    { headers: this.httpHeader, responseType: "json" })
    .pipe(
      retry(1),
      catchError(this.handleError) // then handle the error
    )
  }
}
