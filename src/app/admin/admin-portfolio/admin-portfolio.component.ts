import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { Image, Project } from '../../services/classes';
import { ImageService } from '../../services/image.service';
import { ProjectService } from '../../services/project.service';

import { FadeAnimation, TopDownAnimation } from '../../animations';

import { PortfolioFormComponent } from '../modals/portfolio-form/portfolio-form.component';
import { PortfolioDeleteComponent } from '../modals/portfolio-delete/portfolio-delete.component';

@Component({
  selector: 'app-admin-portfolio',
  templateUrl: './admin-portfolio.component.html',
  styleUrls: ['./admin-portfolio.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class AdminPortfolioComponent implements OnInit {
  dataSource: MatTableDataSource<Project>;
  displayedColumns: string[] = ['title', 'date', 'view', 'edit', 'delete'];
  projects: Project[] = this.projectService.projects;
  images: Image[] = this.imageService.images;
  projectsLoaded = false;
  imagesLoaded = false;
  loading = true;
  filter = '';
  error = '';

  modalOptions = {
    maxHeight: '90%',
    maxWidth: '768px',
    width: '80%'
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private modalService: MatDialog,
    private imageService: ImageService,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    if (this.projects) {
      this.setProjects(this.projects);
    } else {
      this.getProjects();
    }

    if (this.images) {
      this.imagesLoaded = true;
      this.checkData();
    } else {
      this.imageService.getImages()
        .subscribe(
          res => {
            this.images = res;
            this.imagesLoaded = true;
            this.checkData();
          },
          err => this.setError('Could not get images: ' + err)
        );
    }
  }

  getProjects() {
    this.projectService.getProjects()
      .subscribe(
        res => this.setProjects(res),
        err => this.setError('Could not get projects: ' + err)
      );
  }

  setProjects(prj) {
    this.projects = prj;
    this.dataSource = new MatTableDataSource(prj);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.projectsLoaded = true;
    this.checkData();
  }

  checkData() {
    if (this.projectsLoaded && this.imagesLoaded) {
      if (!this.projects.length) {
        this.setError('There are currently no projects available.');
      }

      if (this.filter.length) {
        this.updateFilter();
      }

      this.loading = false;
    }
  }

  updateFilter() {
    this.dataSource.filter = this.filter.toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilter() {
    this.filter = '';
    this.updateFilter();
  }

  new() {
    const modal = this.modalService.open(PortfolioFormComponent, this.modalOptions);
    modal.afterClosed()
      .subscribe(
        result => this.getProjects(),
        error => this.setError(error)
      );
  }

  edit(prj) {
    const modal = this.modalService.open(PortfolioFormComponent, {
      data: prj,
      maxHeight: '90%',
      maxWidth: '768px',
      width: '80%'
    });
    modal.afterClosed()
      .subscribe(
        result => this.getProjects(),
        error => this.setError(error)
      );
  }

  delete(prj) {
    const modal = this.modalService.open(PortfolioDeleteComponent, {
      data: prj,
      maxHeight: '90%',
      maxWidth: '768px',
      width: '80%'
    });
    modal.afterClosed()
      .subscribe(
        result => this.getProjects(),
        error => this.setError(error)
      );
  }

  view(prj) {
    window.open('/portfolio/' + prj.slug);
  }

  setError(err) {
    this.error = err;
    console.error(err);
    this.loading = false;
  }
}
