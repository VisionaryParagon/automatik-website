import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Asset } from '../../../services/classes';
import { AssetService } from '../../../services/asset.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-asset-delete',
  templateUrl: './asset-delete.component.html',
  styleUrls: ['./asset-delete.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class AssetDeleteComponent implements OnInit {
  asset: Asset = new Asset();
  assetName = '';
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
      this.assetName = this.asset.path.split('/').pop();
    }
  }

  delete() {
    this.loading = true;
    if (!this.asset.type || this.asset.type === 'image') {
      this.assetService.deleteImage(this.asset)
        .subscribe(
          deleteRes => {
            this.assetService.deleteAsset(this.asset)
              .subscribe(
                res => {
                  this.success = true;
                  this.loading = false;
                },
                err => this.setError(err)
              );
          }
        );
    } else if (this.asset.type && this.asset.type === 'video') {
      this.assetService.deleteVideo(this.asset)
        .subscribe(
          deleteRes => {
            this.assetService.deleteAsset(this.asset)
              .subscribe(
                res => {
                  this.success = true;
                  this.loading = false;
                },
                err => this.setError(err)
              );
          }
        );
    } else {
      this.assetService.deleteFile(this.asset)
        .subscribe(
          deleteRes => {
            this.assetService.deleteAsset(this.asset)
              .subscribe(
                res => {
                  this.success = true;
                  this.loading = false;
                },
                err => this.setError(err)
              );
          }
        );
    }
  }

  setError(err) {
    this.error = err;
    console.error(err);
    this.loading = false;
  }
}
