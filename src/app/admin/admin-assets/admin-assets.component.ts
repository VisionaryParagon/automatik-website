import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator } from '@angular/material';

import { Asset } from '../../services/classes';
import { AssetService } from '../../services/asset.service';

import { FadeAnimation, TopDownAnimation } from '../../animations';

import { AssetEditComponent } from '../modals/asset-edit/asset-edit.component';
import { AssetDeleteComponent } from '../modals/asset-delete/asset-delete.component';

@Component({
  selector: 'app-admin-assets',
  templateUrl: './admin-assets.component.html',
  styleUrls: ['./admin-assets.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class AdminAssetsComponent implements OnInit {
  assetList: Array<Asset> = new Array<Asset>();
  filteredAssets: Array<Asset> = new Array<Asset>();
  pageSize = 12;
  totalLength = 0;
  currentPage = 0;
  filter = '';
  asset: Asset = new Asset();
  assetId: string;
  assetData: File;
  assetName = 'Choose asset...';
  assetType = '';
  required = false;
  rename = false;
  invalid = false;
  posterData: File;
  posterName = '';
  requiredPoster = false;
  renamePoster = false;
  new = false;
  submitted = false;
  loading = false;
  success = false;
  error = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private modalService: MatDialog,
    private assetService: AssetService
  ) { }

  ngOnInit() {
    this.getAssets();
  }

  getAssets() {
    this.assetService.getAssets()
      .subscribe(
        res => {
          this.filteredAssets = [...this.assetSort(res)];

          if (!this.filter.length) {
            this.assetList = this.assetSort(res);
            this.totalLength = res.length;
            this.iterator();
          } else {
            this.updateFilter();
          }
        },
        err => this.setError(err)
      );
  }

  assetSort(assets) {
    assets.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      return 0;
    });

    return assets;
  }

  handlePage(e) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  iterator(data?) {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    if (!data) {
      this.assetList = this.filteredAssets.slice(start, end);
    } else {
      this.assetList = data.slice(start, end);
    }
  }

  updateFilter() {
    const val = this.filter.toLowerCase();
    let filtered = [];

    filtered = this.filteredAssets.filter(d => JSON.stringify(Object.values(d)).toLowerCase().indexOf(val) !== -1);

    this.assetList = filtered;
    this.totalLength = filtered.length;
    this.currentPage = 0;
    this.iterator(this.assetList);

    if (!this.totalLength) {
      this.setError('No assets found');
    } else {
      this.clearError();
    }
  }

  clearFilter() {
    this.filter = '';
    this.updateFilter();
  }

  select(id) {
    this.assetId = id;
  }

  edit(asset) {
    const modal = this.modalService.open(AssetEditComponent, {
      data: asset,
      maxHeight: '90%',
      maxWidth: '768px',
      width: '90%'
    });
    modal.afterClosed()
      .subscribe(
        result => this.getAssets(),
        error => this.setError(error)
      );
  }

  delete(asset) {
    const modal = this.modalService.open(AssetDeleteComponent, {
      data: asset,
      maxHeight: '90%',
      maxWidth: '768px',
      width: '90%'
    });
    modal.afterClosed()
      .subscribe(
        result => this.getAssets(),
        error => this.setError(error)
      );
  }

  addNew() {
    this.new = true;
  }

  testAssetName(name) {
    const regex = RegExp(/[A-Z~`!@#$%^&*()=+{}[\]/\\|<>'";:,?®™–—]|(\s+)|(\.+$)/, 'g');
    this.rename = regex.test(name);
  }

  setAssetData(ev) {
    this.clearError();
    this.asset = new Asset();
    this.posterName = 'Choose fallback image...';
    this.assetData = ev.target.files[0];

    if (this.assetData) {
      this.assetName = this.assetData.name;
      this.assetType = this.assetData['type'].split('/')[0];

      if (this.assetType === 'image') {
        this.asset.path = 'https://assets.automatik.com/images/' + this.assetName;
        this.asset.type = 'image';
      } else if (this.assetType === 'video') {
        this.asset.path = 'https://assets.automatik.com/videos/' + this.assetName;
        this.asset.type = 'video';
      } else {
        this.asset.path = 'https://assets.automatik.com/files/' + this.assetName;
        this.asset.type = 'file';
      }
      this.testAssetName(this.assetName);
    } else {
      this.assetName = 'Choose asset...';
      this.assetType = '';
      this.required = true;
    }
  }

  testPosterName(name) {
    const regex = RegExp(/[A-Z~`!@#$%^&*()=+{}[\]/\\|<>'";:,?®™–—]|(\s+)|(\.+$)/, 'g');
    this.renamePoster = regex.test(name);
  }

  setPosterData(ev) {
    this.clearError();
    this.posterData = ev.target.files[0];
    this.posterName = this.posterData.name;
    this.asset.poster = 'https://assets.automatik.com/images/' + this.posterName;
    this.testPosterName(this.posterName);
  }

  upload(isValid) {
    this.submitted = true;

    if (isValid) {
      if (this.assetData && !this.rename) {
        this.loading = true;

        this.assetService.validateAsset(this.asset)
          .subscribe(
            validRes => {
              // console.log('Validate pass', validRes);
              if (validRes.isValid) {
                if (this.assetType === 'image') {
                  this.assetService.uploadImage(this.assetData)
                    .subscribe(
                      uploadRes => {
                        // console.log('Upload Image Asset Success: ', uploadRes);
                        this.assetService.createAsset(this.asset)
                          .subscribe(
                            res => {
                              // console.log('New Image Asset Success: ', res);
                              this.success = true;
                              this.loading = false;
                              this.getAssets();
                            },
                            err => this.setError('New Image Asset Error: ' + err)
                          );
                      },
                      err => this.setError('Upload Image Asset Error: ' + err)
                    );
                } else if (this.assetType === 'video') {
                  if (this.posterData && !this.renamePoster) {
                    this.assetService.uploadVideo(this.assetData)
                      .subscribe(
                        vidRes => {
                          // console.log('Upload Video Asset Success: ', vidRes);
                          this.assetService.uploadImage(this.posterData)
                            .subscribe(
                              imgRes => {
                                // console.log('Upload Poster Image Success: ', imgRes);
                                this.assetService.createAsset(this.asset)
                                  .subscribe(
                                    assetRes => {
                                      // console.log('New Video Asset Success: ', assetRes);
                                      this.success = true;
                                      this.loading = false;
                                      this.getAssets();
                                    },
                                    err => this.setError('New Poster Image Error: ' + err)
                                  );
                              },
                              err => this.setError('Upload Poster Image Error: ' + err)
                            );
                        },
                        err => this.setError('Upload Video Asset Error: ' + err)
                      );
                  } else {
                    this.requiredPoster = true;
                    this.loading = false;
                  }
                } else {
                  this.assetService.uploadFile(this.assetData)
                    .subscribe(
                      fileRes => {
                        // console.log('Upload File Asset Success: ', fileRes);
                        this.assetService.createAsset(this.asset)
                          .subscribe(
                            fileAssetRes => {
                              // console.log('New File Asset Success: ', fileAssetRes);
                              this.success = true;
                              this.loading = false;
                              this.getAssets();
                            },
                            err => this.setError('New File Asset Error: ' + err)
                          );
                      },
                      err => this.setError('Upload File Asset Error: ' + err)
                    );
                }
              } else {
                this.invalid = true;
                this.loading = false;
              }
            },
            err => this.setError('Validate fail: ' + err)
          );
      } else {
        this.required = true;
      }
    }
    return false;
  }

  cancel() {
    this.new = false;
    this.loading = false;
    this.reset();
    return false;
  }

  done() {
    this.new = false;
    this.reset();
  }

  reset() {
    this.clearError();
    this.assetId = '';
    this.asset = new Asset();
    this.assetName = 'Choose asset...';
    this.assetType = '';
    this.posterName = 'Choose fallback image...';
    this.submitted = false;
    this.success = false;
  }

  setError(err) {
    this.error = err;
    console.error(err);
    this.loading = false;
  }

  clearError() {
    this.required = false;
    this.rename = false;
    this.invalid = false;
    this.requiredPoster = false;
    this.renamePoster = false;
    this.error = '';
  }
}
