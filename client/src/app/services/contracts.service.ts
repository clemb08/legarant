import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { throwError} from 'rxjs';
import { retry, catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContractsService {

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
  })

  getAllContracts(userId) {
    console.log(userId);
    return this.httpClient.get(`${this.endpoint}/contracts/${userId}`,
      { headers: this.httpHeader, responseType: "json" })
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getProductsByContractId(contractId) {
    console.log(contractId);
    return this.httpClient.get(`${this.endpoint}/products/${contractId}`,
    { headers: this.httpHeader, responseType: "json" })
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

}
