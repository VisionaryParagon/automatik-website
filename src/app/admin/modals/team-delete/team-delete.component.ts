import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Asset, Teammate } from '../../../services/classes';
import { AssetService } from '../../../services/asset.service';
import { TeamService } from '../../../services/team.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-team-delete',
  templateUrl: './team-delete.component.html',
  styleUrls: ['./team-delete.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class TeamDeleteComponent implements OnInit {
  teammate: Teammate = new Teammate();
  assets: Asset[] = this.assetService.assets;
  loading = false;
  success = false;
  error = '';

  constructor(
    private assetService: AssetService,
    private teamService: TeamService,
    @Inject(MAT_DIALOG_DATA) public data: Teammate
  ) { }

  ngOnInit() {
    if (this.data) {
      this.teammate = this.data;
    }
  }

  getImageAlt(path) {
    return this.assets.filter(img => img.path === path)[0].alt;
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
