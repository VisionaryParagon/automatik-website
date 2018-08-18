import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator } from '@angular/material';

import { Image } from '../../services/classes';
import { ImageService } from '../../services/image.service';

import { FadeAnimation, TopDownAnimation } from '../../animations';

import { ImageEditComponent } from '../modals/image-edit/image-edit.component';
import { ImageDeleteComponent } from '../modals/image-delete/image-delete.component';

@Component({
  selector: 'app-admin-images',
  templateUrl: './admin-images.component.html',
  styleUrls: ['./admin-images.component.css'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class AdminImagesComponent implements OnInit {
  imageList: Array<Image> = new Array<Image>();
  filteredImages: Array<Image> = new Array<Image>();
  pageSize = 12;
  totalLength = 0;
  currentPage = 0;
  filter = '';
  image: Image = new Image();
  imageName = 'Choose image...';
  imageData: FileList;
  imageId: string;
  new = false;
  submitted = false;
  loading = false;
  success = false;
  rename = false;
  invalid = false;
  error = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private modalService: MatDialog,
    private imageService: ImageService
  ) { }

  ngOnInit() {
    this.getImages();
  }

  getImages() {
    this.imageService.getImages()
      .subscribe(
        res => {
          this.imageList = this.imageSort(res);
          this.filteredImages = [...this.imageSort(res)];
          this.totalLength = res.length;
          this.iterator();
        },
        err => this.setError(err)
      );
  }

  imageSort(images) {
    images.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      return 0;
    });

    return images;
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
      this.imageList = this.filteredImages.slice(start, end);
    } else {
      this.imageList = data.slice(start, end);
    }
  }

  updateFilter() {
    const val = this.filter.toLowerCase();
    let filtered = [];

    filtered = this.filteredImages.filter(d => JSON.stringify(Object.values(d)).toLowerCase().indexOf(val) !== -1);

    this.imageList = filtered;
    this.totalLength = filtered.length;
    this.currentPage = 0;
    this.iterator(this.imageList);

    if (!this.totalLength) {
      this.setError('No images found');
    } else {
      this.clearError();
    }
  }

  clearFilter() {
    this.filter = '';
    this.updateFilter();
  }

  select(id) {
    this.imageId = id;
  }

  edit(img) {
    const modal = this.modalService.open(ImageEditComponent, {
      data: img,
      maxHeight: '90%',
      maxWidth: '768px',
      width: '80%'
    });
    modal.afterClosed()
      .subscribe(
        result => this.getImages(),
        error => this.setError(error)
      );
  }

  delete(img) {
    const modal = this.modalService.open(ImageDeleteComponent, {
      data: img,
      maxHeight: '90%',
      maxWidth: '768px',
      width: '80%'
    });
    modal.afterClosed()
      .subscribe(
        result => this.getImages(),
        error => this.setError(error)
      );
  }

  addNew() {
    this.new = true;
  }

  testImageName(name) {
    const regex = RegExp(/[~`!@#$%^&*()=+{}[\]/\\|<>'";:,?®™–—]|(\s+)|(\.+$)/, 'g');
    this.rename = regex.test(name);
  }

  setImageData(ev) {
    this.imageData = ev.target.files[0];
    this.imageName = ev.target.files[0].name;
    this.image.path = 'https://assets.automatik9dots.com/images/' + this.imageName;
    this.testImageName(this.imageName);
  }

  upload() {
    this.submitted = true;

    if (this.imageData && !this.rename) {
      this.loading = true;

      this.imageService.validateImage(this.image)
        .subscribe(
          validRes => {
            // console.log('Validate pass', validRes);
            if (validRes.isValid) {
              this.imageService.upload(this.imageData)
                .then(
                  uploadRes => {
                    // console.log('Upload Success: ', uploadRes);
                    this.imageService.createImage(this.image)
                      .subscribe(
                        imageRes => {
                          // console.log('New Image Success: ', imageRes);
                          this.success = true;
                          this.loading = false;
                          this.getImages();
                        },
                        err => this.setError('New Image Error: ' + err)
                      );
                  },
                  err => this.setError('Upload Error: ' + err)
                );
            } else {
              this.invalid = true;
            }
          },
          err => this.setError('Validate fail: ' + err)
        );
    }
    return false;
  }

  cancel() {
    this.new = false;
    this.reset();
    return false;
  }

  done() {
    this.new = false;
    this.reset();
  }

  reset() {
    this.image = new Image();
    this.imageName = 'Choose image...';
    this.imageId = '';
    this.submitted = false;
    this.success = false;
    this.rename = false;
    this.invalid = false;
  }

  setError(err) {
    this.error = err;
    console.error(err);
    this.loading = false;
  }

  clearError() {
    this.error = '';
  }
}
