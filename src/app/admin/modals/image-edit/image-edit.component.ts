import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Image } from '../../../services/classes';
import { ImageService } from '../../../services/image.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.css'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class ImageEditComponent implements OnInit {
  image: Image = new Image();
  submitted = false;
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
    }
  }

  submit(data, isValid) {
    this.submitted = true;

    if (isValid) {
      this.loading = true;
      this.imageService.updateImage(data)
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
