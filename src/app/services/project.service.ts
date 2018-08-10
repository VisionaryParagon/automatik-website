import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { Project } from './classes';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectUrlRoot = '/prj/';
  projects: Project[];
  categories: string[];
  selectedCategory = '';
  filter = '';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (!isPlatformBrowser(this.platformId)) {
      this.projectUrlRoot = 'http://localhost/prj/';
    }
  }

  // Validate project
  validateProject(project) {
    return this.http.post<any>(this.projectUrlRoot + 'valid-project', project)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Add new project
  createProject(project) {
    return this.http.post<Project>(this.projectUrlRoot + 'new-project', project)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Get all projects
  getProjects() {
    return this.http.get<Project[]>(this.projectUrlRoot + 'projects')
      .pipe(
        retry(3),
        tap(prj => {
          this.projects = prj;
          this.categories = prj.map(project => project.category).filter((cat, idx, arr) => {
            return arr.indexOf(cat) === idx;
          });
        }),
        catchError(this.handleError)
      );
  }

  // Get one project
  getProject(project) {
    return this.http.get<Project>(this.projectUrlRoot + 'projects/' + project._id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Update project
  updateProject(project) {
    return this.http.put<Project>(this.projectUrlRoot + 'projects/' + project._id, project)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Delete project
  deleteProject(project) {
    return this.http.delete(this.projectUrlRoot + 'projects/' + project._id)
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
