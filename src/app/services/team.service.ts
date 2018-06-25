import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { Department, Teammate } from '../services/classes';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  teamUrlRoot = '/tm/';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (!isPlatformBrowser(this.platformId)) {
      this.teamUrlRoot = 'http://localhost/tm/';
    }
  }

  // Add new department
  createDepartment(department) {
    return this.http.post<Department>(this.teamUrlRoot + 'new-dept', department)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Get all departments
  getDepartments() {
    return this.http.get<Department[]>(this.teamUrlRoot + 'depts')
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Get one department
  getDepartment(department) {
    return this.http.get<Department>(this.teamUrlRoot + 'depts/' + department._id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Update department
  updateDepartment(department) {
    return this.http.put<Department>(this.teamUrlRoot + 'depts/' + department._id, department)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Delete department
  deleteDepartment(department) {
    return this.http.delete(this.teamUrlRoot + 'depts/' + department._id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Add new teammate
  createTeammate(teammate) {
    return this.http.post<Teammate>(this.teamUrlRoot + 'new-teammate', teammate)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Get all teammates
  getTeammates() {
    return this.http.get<Teammate>(this.teamUrlRoot + 'teammates')
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Get one teammate
  getTeammate(teammate) {
    return this.http.get<Teammate>(this.teamUrlRoot + 'teammates/' + teammate._id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Update teammate
  updateTeammate(teammate) {
    return this.http.put<Teammate>(this.teamUrlRoot + 'teammates/' + teammate._id, teammate)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Delete teammate
  deleteTeammate(teammate) {
    return this.http.delete(this.teamUrlRoot + 'teammates/' + teammate._id)
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
