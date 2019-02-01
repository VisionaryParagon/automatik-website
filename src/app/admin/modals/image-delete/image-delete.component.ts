import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Image } from '../../../services/classes';
import { ImageService } from '../../../services/image.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-image-delete',
  templateUrl: './image-delete.component.html',
  styleUrls: ['./image-delete.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class ImageDeleteComponent implements OnInit {
  image: Image = new Image();
  imageName = '';
  loading = false;
  success = false;
  error = '';

  constructor(
    private imageService: ImageService,
    @Inject(MAT_DIALOG_DATA) public data: Image
  ) { }

  ngOnInit() {
    if (this.data) {
      this.image = this.data;
      this.imageName = this.image.path.split('/').pop();
    }
  }

  delete() {
    this.loading = true;
    this.imageService.deleteImage(this.image)
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
