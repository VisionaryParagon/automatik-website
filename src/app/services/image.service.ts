import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { Image } from './classes';

import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageUrlRoot = '/img/';
  bucket: S3 = new S3({
    accessKeyId: 'AKIAIBVPXCZJF7XWOSYA',
    secretAccessKey: '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',
    region: 'us-west-2'
  });
  images: Image[];

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (!isPlatformBrowser(this.platformId)) {
      this.imageUrlRoot = 'http://localhost/img/';
    }
  }

  // Validate image
  validateImage(image) {
    return this.http.post<any>(this.imageUrlRoot + 'valid-image', image)
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

  upload(file) {
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: 'assets.automatik9dots.com',
      Key: 'images/' + file.name
    };

    return this.bucket.upload(params).promise();
  }

  delete(file) {
    const params = {
      Bucket: 'assets.automatik9dots.com',
      Key: 'images/' + file
    };

    return this.bucket.deleteObject(params).promise();
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
