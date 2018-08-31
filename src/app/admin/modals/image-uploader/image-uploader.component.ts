import { Component, OnInit } from '@angular/core';

import { Image } from '../../../services/classes';
import { ImageService } from '../../../services/image.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class ImageUploaderComponent implements OnInit {
  tabId = 0;
  filter = '';
  imageList: Image[];
  filteredImages: Image[];
  image: Image = new Image();
  imageName = 'Choose image...';
  imageData: FileList;
  selected: string;
  submitted = false;
  loading = false;
  success = false;
  rename = false;
  invalid = false;
  error = '';

  constructor(
    private imageService: ImageService
  ) { }

  ngOnInit() {
    this.imageService.getImages()
      .subscribe(
        res => {
          this.imageList = this.imageSort(res);
          this.filteredImages = [...this.imageSort(res)];
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

  updateFilter() {
    const val = this.filter.toLowerCase();
    let filtered = [];

    filtered = this.filteredImages.filter(d => JSON.stringify(Object.values(d)).toLowerCase().indexOf(val) !== -1);

    this.imageList = filtered;
  }

  clearFilter() {
    this.filter = '';
    this.updateFilter();
  }

  setTab(ev) {
    this.tabId = ev;
  }

  select(path) {
    this.selected = path;
  }

  testImageName(name) {
    const regex = RegExp(/[A-Z~`!@#$%^&*()=+{}[\]/\\|<>'";:,?®™–—]|(\s+)|(\.+$)/, 'g');
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
                .then(uploadRes => {
                  // console.log('Upload Success: ', uploadRes);
                  this.imageService.createImage(this.image)
                    .subscribe(
                      imageRes => {
                        // console.log('New Image Success: ', imageRes);
                        this.selected = imageRes.path;
                        this.success = true;
                        this.loading = false;
                      },
                      err => this.setError('New Image Error: ' + err)
                    );
                })
                .catch(err => this.setError('Upload Error: ' + err));
            } else {
              this.invalid = true;
            }
          },
          err => this.setError('Validate fail: ' + err)
        );
    } else {
      this.setError('Please select an image to upload');
    }
    return false;
  }

  reset() {
    this.image = new Image();
    this.imageName = 'Choose image...';
    this.selected = '';
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
}
