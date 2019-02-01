import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { Department, Teammate } from '../../../services/classes';
import { TeamService } from '../../../services/team.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

import { DepartmentFormComponent } from '../../modals/department-form/department-form.component';
import { DepartmentDeleteComponent } from '../../modals/department-delete/department-delete.component';

@Component({
  selector: 'app-department-data',
  templateUrl: './department-data.component.html',
  styleUrls: ['./department-data.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class DepartmentDataComponent implements OnInit {
  departments: Department[] = this.teamService.departments;
  dataSource: MatTableDataSource<Department>;
  displayedColumns: string[] = ['name', 'rank', 'edit', 'delete'];
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
    private teamService: TeamService
  ) { }

  ngOnInit() {
    if (this.departments) {
      this.setDepartments(this.departments);
    } else {
      this.getDepartments();
    }
  }

  getDepartments() {
    this.teamService.getDepartments()
      .subscribe(
        res => this.setDepartments(res),
        err => this.setError('Could not get departments: ' + err)
      );
  }

  setDepartments(data) {
    this.departments = this.departmentSort(data);
    this.dataSource = new MatTableDataSource(this.departments);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.filter.length) {
      this.updateFilter();
    }

    this.loading = false;
  }

  departmentSort(depts) {
    depts.sort((a, b) => {
      if (a.rank < b.rank) {
        return -1;
      }
      if (a.rank > b.rank) {
        return 1;
      }
      return 0;
    });

    return depts;
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
    const modal = this.modalService.open(DepartmentFormComponent, this.modalOptions);
    modal.afterClosed()
      .subscribe(
        result => this.getDepartments(),
        error => this.setError(error)
      );
  }

  edit(data) {
    const modal = this.modalService.open(DepartmentFormComponent, {
      data: data,
      maxHeight: '90%',
      maxWidth: '768px',
      width: '80%'
    });
    modal.afterClosed()
      .subscribe(
        result => this.getDepartments(),
        error => this.setError(error)
      );
  }

  delete(data) {
    const modal = this.modalService.open(DepartmentDeleteComponent, {
      data: data,
      maxHeight: '90%',
      maxWidth: '768px',
      width: '80%'
    });
    modal.afterClosed()
      .subscribe(
        result => this.getDepartments(),
        error => this.setError(error)
      );
  }

  setError(err) {
    this.error = err;
    console.error(err);
    this.loading = false;
  }
}
