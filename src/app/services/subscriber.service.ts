import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { Subscriber } from './classes';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  subUrlRoot = environment.subscriber;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // Add new subscriber
  createSubscriber(subscriber) {
    return this.http.post<Subscriber>(this.subUrlRoot + 'new', subscriber)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Get all subscribers
  getSubscribers() {
    return this.http.get<Subscriber[]>(this.subUrlRoot + 'subs')
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Get one subscriber
  getSubscriber(subscriber) {
    return this.http.get<Subscriber>(this.subUrlRoot + 'subs/' + subscriber._id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Update subscriber
  updateSubscriber(subscriber) {
    return this.http.put<Subscriber>(this.subUrlRoot + 'subs/' + subscriber._id, subscriber)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Delete subscriber
  deleteSubscriber(subscriber) {
    return this.http.delete(this.subUrlRoot + 'subs/' + subscriber._id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Send confirmation email
  sendConfirmation(subscriber) {
    return this.http.post(this.subUrlRoot + 'subscribe', subscriber)
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
