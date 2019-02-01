import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Department } from '../../../services/classes';
import { TeamService } from '../../../services/team.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

import { MaxValidatorDirective } from '../../../directives/max-validator.directive';
import { MinValidatorDirective } from '../../../directives/min-validator.directive';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class DepartmentFormComponent implements OnInit {
  department: Department = new Department();
  departments: Department[] = [...this.teamService.departments];
  departmentCache: Department;
  deptMin = 1;
  deptMax = this.departments.length + 1;
  new = true;
  loading = false;
  submitted = false;
  success = false;
  error = '';

  modalOptions = {
    maxHeight: '90%',
    maxWidth: '768px',
    width: '80%'
  };

  constructor(
    private teamService: TeamService,
    @Inject(MAT_DIALOG_DATA) public data: Department
  ) { }

  ngOnInit() {
    if (this.data) {
      this.department = this.data;
      this.departmentCache = {...this.data};
      this.new = false;
    }
  }

  updateDepartment(data) {
    this.teamService.updateDepartment(data)
      .subscribe(
        res => {
          this.success = true;
          this.loading = false;
        },
        err => this.setError('Update department error: ' + err)
      );
  }

  submit(data, isValid) {
    this.submitted = true;

    if (isValid) {
      this.loading = true;

      if (this.new) {
        this.teamService.createDepartment(data)
          .subscribe(
            res => {
              const newDepts = [];

              this.departments.filter(dept => dept.rank >= data.rank).forEach(dept => {
                dept.rank++;
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
            err => this.setError('New department error: ' + err)
          );
      } else {
        if (data.rank < this.departmentCache.rank) {
          const newDepts = this.departments.filter(dept => dept.rank >= data.rank && dept.rank < this.departmentCache.rank);
          const deptIdx = newDepts.findIndex(dept => dept._id === this.department._id);

          newDepts.splice(deptIdx, 1);
          newDepts.forEach(dept => dept.rank++);

          this.teamService.updateDepartmentRanks(newDepts)
            .subscribe(
              res => this.updateDepartment(data),
              err => this.setError('Update department ranks error: ' + err)
            );
        } else if (data.rank > this.departmentCache.rank) {
          const newDepts = this.departments.filter(dept => dept.rank <= data.rank && dept.rank > this.departmentCache.rank);
          const deptIdx = newDepts.findIndex(dept => dept._id === this.department._id);

          newDepts.splice(deptIdx, 1);
          newDepts.forEach(dept => dept.rank--);

          this.teamService.updateDepartmentRanks(newDepts)
            .subscribe(
              res => this.updateDepartment(data),
              err => this.setError('Update department ranks error: ' + err)
            );
        } else {
          this.updateDepartment(data);
        }
      }
    }
  }

  addAnother() {
    this.department = new Department();
    this.submitted = false;
    this.success = false;
  }

  editAgain() {
    this.submitted = false;
    this.success = false;
  }

  setError(err) {
    this.error = err;
    console.error(err);
    this.loading = false;
  }
}
