import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { Department, Image, Teammate } from '../../../services/classes';
import { ImageService } from '../../../services/image.service';
import { TeamService } from '../../../services/team.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

import { TeamFormComponent } from '../../modals/team-form/team-form.component';
import { TeamDeleteComponent } from '../../modals/team-delete/team-delete.component';

@Component({
  selector: 'app-team-data',
  templateUrl: './team-data.component.html',
  styleUrls: ['./team-data.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class TeamDataComponent implements OnInit {
  teammates: Teammate[] = this.teamService.team;
  departments: Department[] = this.teamService.departments;
  images: Image[] = this.imageService.images;
  dataSource: MatTableDataSource<Teammate>;
  displayedColumns: string[] = ['primary_image', 'first_name', 'last_name', 'edit', 'delete'];
  teamLoaded = false;
  deptsLoaded = false;
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
    private teamService: TeamService
  ) { }

  ngOnInit() {
    if (this.teammates) {
      this.setTeam(this.teammates);
    } else {
      this.getTeam();
    }

    if (this.departments) {
      this.setDepartments(this.departments);
    } else {
      this.getDepartments();
    }

    if (this.images) {
      this.setImages(this.images);
    } else {
      this.getImages();
    }
  }

  getTeam() {
    this.teamService.getTeammates()
      .subscribe(
        res => this.setTeam(res),
        err => this.setError('Could not get team: ' + err)
      );
  }

  setTeam(data) {
    this.teammates = this.teamSort(data);
    this.dataSource = new MatTableDataSource(this.teammates);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.teamLoaded = true;
    this.checkData();
  }

  getDepartments() {
    this.teamService.getDepartments()
      .subscribe(
        res => this.setDepartments(res),
        err => this.setError('Could not get departments: ' + err)
      );
  }

  setDepartments(data) {
    this.departments = data;
    this.deptsLoaded = true;
    this.checkData();
  }

  getDepartmentRank(id) {
    if (this.departments) {
      return this.departments.filter(dept => dept._id === id)[0].rank;
    }
  }

  teamSort(team) {
    team.sort((a, b) => {
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
    });

    return team;
  }

  getImages() {
    this.imageService.getImages()
      .subscribe(
        res => this.setImages(res),
        err => this.setError('Could not get images: ' + err)
      );
  }

  setImages(data) {
    this.images = data;
    this.imagesLoaded = true;
    this.checkData();
  }

  checkData() {
    if (this.teamLoaded && this.deptsLoaded && this.imagesLoaded) {
      if (this.filter.length) {
        this.updateFilter();
      }

      this.loading = false;
    }
  }

  getImageAlt(path) {
    if (this.images) {
      return this.images.filter(img => img.path === path)[0].alt;
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
    const modal = this.modalService.open(TeamFormComponent, this.modalOptions);
    modal.afterClosed()
      .subscribe(
        result => {
          this.getTeam();
          this.getImages();
        },
        error => this.setError(error)
      );
  }

  edit(data) {
    const modal = this.modalService.open(TeamFormComponent, {
      data: data,
      maxHeight: '90%',
      maxWidth: '768px',
      width: '80%'
    });
    modal.afterClosed()
      .subscribe(
        result => {
          this.getTeam();
          this.getImages();
        },
        error => this.setError(error)
      );
  }

  delete(data) {
    const modal = this.modalService.open(TeamDeleteComponent, {
      data: data,
      maxHeight: '90%',
      maxWidth: '768px',
      width: '80%'
    });
    modal.afterClosed()
      .subscribe(
        result => {
          this.getTeam();
          this.getImages();
        },
        error => this.setError(error)
      );
  }

  setError(err) {
    this.error = err;
    console.error(err);
    this.loading = false;
  }
}
