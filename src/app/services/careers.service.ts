import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { CareerInquiry, CareerPosition } from './classes';

@Injectable({
  providedIn: 'root'
})
export class CareersService {
  careerUrlRoot = '/careers/';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (!isPlatformBrowser(this.platformId)) {
      this.careerUrlRoot = 'http://localhost/careers/';
    }
  }

  createPosition(position) {
    return this.http.post<CareerPosition>(this.careerUrlRoot + 'new', position)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getPositions() {
    return this.http.get<CareerPosition>(this.careerUrlRoot + 'positions')
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getPosition(position) {
    return this.http.get<CareerPosition>(this.careerUrlRoot + 'positions/' + position._id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  updatePosition(position) {
    return this.http.put<CareerPosition>(this.careerUrlRoot + 'positions/' + position._id, position)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  deletePosition(position) {
    return this.http.delete(this.careerUrlRoot + 'positions/' + position._id, position)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  inquire(inquiry) {
    return this.http.post(this.careerUrlRoot + 'inquire', inquiry)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (isPlatformBrowser(this.platformId)) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.message}`);
      }
    } else {
      console.log(error);
    }
    // return an observable with a user-facing error message
    return throwError(
      'An error occurred; please try again later.');
  }
}
