import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { Image, Department, Teammate } from '../../../services/classes';
import { ImageService } from '../../../services/image.service';
import { TeamService } from '../../../services/team.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

import { ImageUploaderComponent } from '../image-uploader/image-uploader.component';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class TeamFormComponent implements OnInit {
  teammate: Teammate = new Teammate();
  images: Image[] = this.imageService.images;
  departments: Department[] = this.teamService.departments;
  new = true;
  anyVal: any;
  loading = false;
  submitted = false;
  success = false;
  invalid = false;
  error = '';

  modalOptions = {
    maxHeight: '90%',
    maxWidth: '768px',
    width: '80%'
  };

  constructor(
    private modalService: MatDialog,
    private imageService: ImageService,
    private teamService: TeamService,
    @Inject(MAT_DIALOG_DATA) public data: Teammate
  ) { }

  ngOnInit() {
    if (this.data) {
      this.teammate = this.data;
      this.new = false;
    }
  }

  getImageAlt(path) {
    return this.images.filter(img => img.path === path)[0].alt;
  }

  chooseImage(field) {
    const modal = this.modalService.open(ImageUploaderComponent, this.modalOptions);
    modal.afterClosed()
      .subscribe(
        result => {
          if (result) {
            if (field === 'primary_image') {
              this.teammate.primary_image = result;
            } else if (field === 'secondary_image') {
              this.teammate.secondary_image = result;
            }
          }
        },
        error => this.setError(error)
      );
  }

  submit(data, isValid) {
    this.submitted = true;

    if (isValid) {
      this.loading = true;

      if (this.new) {
        this.teamService.createTeammate(this.teammate)
          .subscribe(
            res => {
              this.success = true;
              this.loading = false;
            },
            err => this.setError('New teammate error: ' + err)
          );
      } else {
        this.teamService.updateTeammate(this.teammate)
          .subscribe(
            res => {
              this.success = true;
              this.loading = false;
            },
            err => this.setError('Update teammate error: ' + err)
          );
      }
    }
  }

  addAnother() {
    this.teammate = new Teammate();
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
