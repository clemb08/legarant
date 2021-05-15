import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

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

  loginUser(username, password): Observable<string> {

    const params = new HttpParams()
      .set('username', `${username}`)
      .set('password', `${password}`);

      let check = false;

    return this.httpClient.get<string>(this.endpoint + '/login', { headers: this.httpHeader, params, responseType: "json" })
    .pipe(
      retry(1),
      catchError(this.handleError) // then handle the error
    )
  }
}
