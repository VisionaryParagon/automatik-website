import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { CareerPosition } from '../../services/classes';
import { CareersService } from '../../services/careers.service';

import { FadeAnimation, TopDownAnimation } from '../../animations';

import { CareerFormComponent } from '../modals/career-form/career-form.component';
import { CareerDeleteComponent } from '../modals/career-delete/career-delete.component';

@Component({
  selector: 'app-admin-careers',
  templateUrl: './admin-careers.component.html',
  styleUrls: ['./admin-careers.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class AdminCareersComponent implements OnInit {
  dataSource: MatTableDataSource<CareerPosition>;
  displayedColumns: string[] = ['position', 'edit', 'delete'];
  careers: CareerPosition[] = this.careersService.positions;
  careersLoaded = false;
  loading = true;
  filter = '';
  error = '';

  modalOptions = {
    maxHeight: '90%',
    maxWidth: '768px',
    width: '90%'
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private modalService: MatDialog,
    private careersService: CareersService
  ) { }

  ngOnInit() {
    if (this.careers) {
      this.setCareers(this.careers);
    } else {
      this.getCareers();
    }
  }

  getCareers() {
    this.careersService.getPositions()
      .subscribe(
        res => this.setCareers(res),
        err => this.setError('Could not get careers: ' + err)
      );
  }

  setCareers(carr) {
    this.careers = carr;
    this.dataSource = new MatTableDataSource(this.careers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.careersLoaded = true;
    this.checkData();
  }

  checkData() {
    if (this.careersLoaded) {
      if (!this.careers.length) {
        this.setError('There are currently no careers available.');
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
    const modal = this.modalService.open(CareerFormComponent, this.modalOptions);
    modal.afterClosed()
      .subscribe(
        result => this.getCareers(),
        error => this.setError(error)
      );
  }

  edit(career) {
    const modal = this.modalService.open(CareerFormComponent, {
      data: career,
      maxHeight: '90%',
      maxWidth: '768px',
      width: '90%'
    });
    modal.afterClosed()
      .subscribe(
        result => this.getCareers(),
        error => this.setError(error)
      );
  }

  delete(career) {
    const modal = this.modalService.open(CareerDeleteComponent, {
      data: career,
      maxHeight: '90%',
      maxWidth: '768px',
      width: '90%'
    });
    modal.afterClosed()
      .subscribe(
        result => this.getCareers(),
        error => this.setError(error)
      );
  }

  setError(err) {
    this.error = err;
    console.error(err);
    this.loading = false;
  }
}
