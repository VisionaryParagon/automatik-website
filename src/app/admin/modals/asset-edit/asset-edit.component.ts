import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Asset } from '../../../services/classes';
import { AssetService } from '../../../services/asset.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-asset-edit',
  templateUrl: './asset-edit.component.html',
  styleUrls: ['./asset-edit.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class AssetEditComponent implements OnInit {
  asset: Asset = new Asset();
  submitted = false;
  loading = false;
  success = false;
  error = '';

  constructor(
    private assetService: AssetService,
    @Inject(MAT_DIALOG_DATA) public data: Asset
  ) { }

  ngOnInit() {
    if (this.data) {
      this.asset = this.data;
      if (!this.asset.type) {
        this.asset.type = 'image';
      }
    }
  }

  submit(data, isValid) {
    this.submitted = true;

    if (isValid) {
      this.loading = true;
      this.assetService.updateAsset(data)
        .subscribe(
          res => {
            this.success = true;
            this.loading = false;
          },
          err => this.setError(err)
        );
    }
    return false;
  }

  editAgain() {
    this.success = false;
    return false;
  }

  setError(err) {
    this.error = err;
    console.error(err);
    this.loading = false;
  }
}
