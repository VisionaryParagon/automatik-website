import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  blogUrlRoot = 'https://automatikblog.us/wp-json/wp/v2/';
  dataRetrieved = false;
  blogs;
  media;
  categories;
  authors;
  tags;
  filter = '';
  selectedCategory = '';
  selectedAuthor = '';

  constructor(
    private http: HttpClient
  ) { }

  getPosts() {
    return this.http.get(this.blogUrlRoot + 'posts')
      .pipe(
        retry(3),
        tap(blogs => {
          this.blogs = blogs;
          this.checkData();
        }),
        catchError(this.handleError)
      );
  }

  getMedia() {
    return this.http.get(this.blogUrlRoot + 'media')
      .pipe(
        retry(3),
        tap(media => {
          this.media = media;
          this.checkData();
        }),
        catchError(this.handleError)
      );
  }

  getCategories() {
    return this.http.get(this.blogUrlRoot + 'categories')
      .pipe(
        retry(3),
        tap(categories => {
          this.categories = categories;
          this.checkData();
        }),
        catchError(this.handleError)
      );
  }

  getAuthors() {
    return this.http.get(this.blogUrlRoot + 'users')
      .pipe(
        retry(3),
        tap(users => {
          this.authors = users;
          this.checkData();
        }),
        catchError(this.handleError)
      );
  }

  getTags() {
    return this.http.get(this.blogUrlRoot + 'tags')
      .pipe(
        retry(3),
        tap(tags => {
          this.tags = tags;
          this.checkData();
        }),
        catchError(this.handleError)
      );
  }

  private checkData() {
    if (this.blogs && this.media && this.categories && this.authors && this.tags) {
      this.dataRetrieved = true;
    } else {
      this.dataRetrieved = false;
    }
  }

  private handleError(error: HttpErrorResponse) {
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
    // return an observable with a user-facing error message
    return throwError(
      'An error occurred; please try again later.');
  }
}
