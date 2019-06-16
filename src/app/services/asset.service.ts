import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { Asset } from './classes';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  assetUrlRoot = environment.assets;
  assets: Asset[];

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // Validate asset
  validateAsset(asset) {
    return this.http.post<any>(this.assetUrlRoot + 'assets/valid', asset)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Add new asset
  createAsset(asset) {
    return this.http.post<Asset>(this.assetUrlRoot + 'assets/new', asset)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Get all asset
  getAssets() {
    return this.http.get<Asset[]>(this.assetUrlRoot + 'assets')
      .pipe(
        retry(3),
        tap(ast => this.assets = ast),
        catchError(this.handleError)
      );
  }

  // Get one asset
  getAsset(asset) {
    return this.http.get<Asset>(this.assetUrlRoot + 'asset/' + asset._id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Update asset
  updateAsset(asset) {
    return this.http.put<Asset>(this.assetUrlRoot + 'assets/' + asset._id, asset)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Delete asset
  deleteAsset(asset) {
    return this.http.delete(this.assetUrlRoot + 'assets/' + asset._id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // S3 routes
  // Upload new image
  uploadImage(image) {
    const formdata: FormData = new FormData();
    formdata.append('file', image);

    return this.http.post<any>(this.assetUrlRoot + 'images/upload', formdata)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Upload new image
  deleteImage(image) {
    return this.http.post<any>(this.assetUrlRoot + 'images/delete', image)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Upload new video
  uploadVideo(video) {
    const formdata: FormData = new FormData();
    formdata.append('file', video);

    return this.http.post<any>(this.assetUrlRoot + 'videos/upload', formdata)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Upload new video
  deleteVideo(video) {
    return this.http.post<any>(this.assetUrlRoot + 'videos/delete', video)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Upload new file
  uploadFile(file) {
    const formdata: FormData = new FormData();
    formdata.append('file', file);

    return this.http.post<any>(this.assetUrlRoot + 'files/upload', formdata)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Upload new file
  deleteFile(file) {
    return this.http.post<any>(this.assetUrlRoot + 'files/delete', file)
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
