import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Department } from '../../../services/classes';
import { TeamService } from '../../../services/team.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-department-delete',
  templateUrl: './department-delete.component.html',
  styleUrls: ['./department-delete.component.css'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class DepartmentDeleteComponent implements OnInit {
  department: Department = new Department();
  departments: Department[] = [...this.teamService.departments];
  loading = false;
  success = false;
  error = '';

  constructor(
    private teamService: TeamService,
    @Inject(MAT_DIALOG_DATA) public data: Department
  ) { }

  ngOnInit() {
    if (this.data) {
      this.department = this.data;
    }
  }

  delete() {
    this.loading = true;
    this.teamService.deleteDepartment(this.department)
      .subscribe(
        res => {
          const newDepts = [];

          this.departments.filter(dept => dept.rank >= this.department.rank).forEach(dept => {
            dept.rank--;
            newDepts.push(dept);
          });

          if (newDepts.length) {
            this.teamService.updateDepartmentRanks(newDepts)
              .subscribe(
                rankRes => {
                  this.success = true;
                  this.loading = false;
                },
                rankErr => this.setError('Update department ranks error: ' + rankErr)
              );
          } else {
            this.success = true;
            this.loading = false;
          }
        },
        err => this.setError(err)
      );
  }

  setError(err) {
    this.error = err;
    console.error(err);
    this.loading = false;
  }
}
