import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Project } from '../../../services/classes';
import { ProjectService } from '../../../services/project.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-portfolio-delete',
  templateUrl: './portfolio-delete.component.html',
  styleUrls: ['./portfolio-delete.component.css'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class PortfolioDeleteComponent implements OnInit {
  project: Project = new Project();
  loading = false;
  success = false;
  error = '';

  constructor(
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: Project
  ) { }

  ngOnInit() {
    if (this.data) {
      this.project = this.data;
    }
  }

  delete() {
    this.loading = true;
    this.projectService.deleteProject(this.project).subscribe(
      res => {
        this.success = true;
        this.loading = false;
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
