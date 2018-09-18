import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { Image } from './classes';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageUrlRoot = environment.images;
  images: Image[];

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // Validate image
  validateImage(image) {
    return this.http.post<any>(this.imageUrlRoot + 'valid-image', image)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Upload new image
  uploadImage(file) {
    const formdata: FormData = new FormData();
    formdata.append('file', file);

    return this.http.post<any>(this.imageUrlRoot + 'upload-image', formdata)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Add new image
  createImage(image) {
    return this.http.post<Image>(this.imageUrlRoot + 'new-image', image)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Get all images
  getImages() {
    return this.http.get<Image[]>(this.imageUrlRoot + 'images')
      .pipe(
        retry(3),
        tap(img => this.images = img),
        catchError(this.handleError)
      );
  }

  // Get one image
  getImage(image) {
    return this.http.get<Image>(this.imageUrlRoot + 'images/' + image._id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Update image
  updateImage(image) {
    return this.http.put<Image>(this.imageUrlRoot + 'images/' + image._id, image)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Delete image
  deleteImage(image) {
    return this.http.delete(this.imageUrlRoot + 'images/' + image._id)
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
