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
  imageList: Image[];
  image: Image = new Image();
  imageName = 'Choose image...';
  imageData: FileList;
  imageId: string;
  selected = '';
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
        res => this.imageList = this.imageSort(res),
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

  setTab(ev) {
    this.tabId = ev;
  }

  select(id) {
    this.selected = id;
    this.imageId = id;
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
                .then(uploadRes => {
                  // console.log('Upload Success: ', uploadRes);
                  this.imageService.createImage(this.image)
                    .subscribe(
                      imageRes => {
                        // console.log('New Image Success: ', imageRes);
                        this.imageId = imageRes._id;
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
}
