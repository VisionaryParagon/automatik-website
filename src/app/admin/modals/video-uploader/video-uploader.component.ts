import { Component, OnInit } from '@angular/core';

import { Asset } from '../../../services/classes';
import { AssetService } from '../../../services/asset.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-video-uploader',
  templateUrl: './video-uploader.component.html',
  styleUrls: ['./video-uploader.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class VideoUploaderComponent implements OnInit {
  tabId = 0;
  filter = '';
  videoList: Asset[];
  filteredVideos: Asset[];
  asset: Asset = new Asset();
  assetData: File;
  assetName = 'Choose video...';
  required = false;
  rename = false;
  invalid = false;
  posterData: File;
  posterName = 'Choose fallback image...';
  requiredPoster = false;
  renamePoster = false;
  selected: Asset = new Asset();
  submitted = false;
  loading = false;
  success = false;
  error = '';

  constructor(
    private assetService: AssetService
  ) { }

  ngOnInit() {
    this.assetService.getAssets()
      .subscribe(
        res => {
          this.videoList = this.videoSort(res);
          this.filteredVideos = [...this.videoSort(res)];
        },
        err => this.setError(err)
      );
  }

  videoSort(assets) {
    assets.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      return 0;
    });

    return assets.filter(vid => vid.type && vid.type === 'video');
  }

  updateFilter() {
    const val = this.filter.toLowerCase();
    let filtered = [];

    filtered = this.filteredVideos.filter(d => JSON.stringify(Object.values(d)).toLowerCase().indexOf(val) !== -1);

    this.videoList = filtered;
  }

  clearFilter() {
    this.filter = '';
    this.updateFilter();
  }

  setTab(ev) {
    this.tabId = ev;
  }

  select(asset) {
    this.selected = asset;
  }

  testVideoName(name) {
    const regex = RegExp(/[A-Z~`!@#$%^&*()=+{}[\]/\\|<>'";:,?®™–—]|(\s+)|(\.+$)/, 'g');
    this.rename = regex.test(name);
  }

  setVideoData(ev) {
    this.clearError();
    this.asset = new Asset();
    this.assetData = ev.target.files[0];

    if (this.assetData) {
      console.log(this.assetData);
      this.assetName = this.assetData.name;
      this.asset.path = 'https://assets.automatik.com/videos/' + this.assetName;
      this.asset.type = 'video';
      this.testVideoName(this.assetName);
    } else {
      this.assetName = 'Choose video...';
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

    if (this.posterData) {
      this.posterName = this.posterData.name;
      this.asset.poster = 'https://assets.automatik.com/images/' + this.posterName;
      this.testPosterName(this.posterName);
    } else {
      this.posterName = 'Choose fallback image...';
      this.requiredPoster = true;
    }
  }

  upload() {
    this.submitted = true;

    if (this.assetData && !this.rename) {
      if (this.posterData && !this.renamePoster) {
        this.loading = true;

        this.assetService.validateAsset(this.asset)
          .subscribe(
            validRes => {
              // console.log('Validate pass', validRes);
              if (validRes.isValid) {
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
                                res => {
                                  // console.log('New Video Asset Success: ', assetRes);
                                  this.selected = res;
                                  this.success = true;
                                  this.loading = false;
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
                this.invalid = true;
                this.loading = false;
              }
            },
            err => this.setError('Validate fail: ' + err)
          );
      } else {
        this.requiredPoster = true;
      }
    } else {
      this.required = true;
    }
    return false;
  }

  reset() {
    this.clearError();
    this.asset = new Asset();
    this.assetName = 'Choose video...';
    this.posterName = 'Choose fallback image...';
    this.selected = new Asset();
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
