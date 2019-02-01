import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { Department, Teammate } from './classes';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  team: Teammate[];
  departments: Department[];
  teamUrlRoot = environment.team;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // Sort teammates
  getDepartmentRank(id) {
    if (this.departments) {
      return this.departments.filter(dept => dept._id === id)[0].rank;
    }
  }

  teamSort(team) {
    team.sort((a, b) => {
      const xd = this.getDepartmentRank(a.department);
      const yd = this.getDepartmentRank(b.department);
      const xs = a.seniority;
      const ys = b.seniority;
      /*
      if (this.getDepartmentRank(a.department) < this.getDepartmentRank(b.department)) {
        return -1;
      }
      if (this.getDepartmentRank(a.department) > this.getDepartmentRank(b.department)) {
        return 1;
      }
      if (a.seniority < b.seniority) {
        return -1;
      }
      if (a.seniority > b.seniority) {
        return 1;
      }
      return 0;
      */
      return ((xd < yd) ? -1 : ((xd > yd) ? 1 : ((xs < ys) ? -1 : ((xs > ys) ? 1 : 0))));
    });

    return team;
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
        tap(res => this.departments = res),
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

  // Update department ranks
  updateDepartmentRanks(departments) {
    return this.http.put<any>(this.teamUrlRoot + 'deptsrank', departments)
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
    return this.http.get<Teammate[]>(this.teamUrlRoot + 'teammates')
      .pipe(
        retry(3),
        tap(res => this.team = this.teamSort(res)),
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
