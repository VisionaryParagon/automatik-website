import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { NewsArticle } from './classes';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  newsUrlRoot = environment.news;
  news: NewsArticle[];
  filter = '';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // Get article data
  getArticleData(url) {
    return this.http.post<any>(this.newsUrlRoot + 'articles/get-data', url)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Add new article
  createArticle(news) {
    return this.http.post<NewsArticle>(this.newsUrlRoot + 'articles/new', news)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Get all articles
  getArticles() {
    return this.http.get<NewsArticle[]>(this.newsUrlRoot + 'articles')
      .pipe(
        retry(3),
        tap(nws => this.news = nws),
        catchError(this.handleError)
      );
  }

  // Get one article
  getArticle(news) {
    return this.http.get<NewsArticle>(this.newsUrlRoot + 'articles/' + news._id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Update article
  updateArticle(news) {
    return this.http.put<NewsArticle>(this.newsUrlRoot + 'articles/' + news._id, news)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Delete article
  deleteArticle(news) {
    return this.http.delete(this.newsUrlRoot + 'articles/' + news._id)
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
