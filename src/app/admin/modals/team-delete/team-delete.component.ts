import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Image, Teammate } from '../../../services/classes';
import { ImageService } from '../../../services/image.service';
import { TeamService } from '../../../services/team.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-team-delete',
  templateUrl: './team-delete.component.html',
  styleUrls: ['./team-delete.component.css'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class TeamDeleteComponent implements OnInit {
  teammate: Teammate = new Teammate();
  images: Image[] = this.imageService.images;
  loading = false;
  success = false;
  error = '';

  constructor(
    private imageService: ImageService,
    private teamService: TeamService,
    @Inject(MAT_DIALOG_DATA) public data: Teammate
  ) { }

  ngOnInit() {
    if (this.data) {
      this.teammate = this.data;
    }
  }

  getImageAlt(path) {
    return this.images.filter(img => img.path === path)[0].alt;
  }

  delete() {
    this.loading = true;
    this.teamService.deleteTeammate(this.teammate)
      .subscribe(
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
