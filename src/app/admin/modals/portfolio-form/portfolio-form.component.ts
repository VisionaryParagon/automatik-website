import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { Image, Project } from '../../../services/classes';
import { ImageService } from '../../../services/image.service';
import { ProjectService } from '../../../services/project.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

import { ImageUploaderComponent } from '../image-uploader/image-uploader.component';

@Component({
  selector: 'app-portfolio-form',
  templateUrl: './portfolio-form.component.html',
  styleUrls: ['./portfolio-form.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class PortfolioFormComponent implements OnInit {
  project: Project = new Project();
  images: Image[] = this.imageService.images;
  categories: string[] = this.projectService.categories;
  highlightList: Array<string> = new Array<string>(3).fill('');
  imageList: Array<string> = new Array<string>(3).fill('');
  new = true;
  loading = false;
  submitted = false;
  success = false;
  suffix = false;
  invalid = false;
  error = '';

  modalOptions = {
    maxHeight: '90%',
    maxWidth: '768px',
    width: '80%'
  };

  constructor(
    private modalService: MatDialog,
    private imageService: ImageService,
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: Project
  ) { }

  ngOnInit() {
    if (this.data) {
      this.project = this.data;
      this.highlightList = this.data.highlights;
      this.imageList = this.data.images;
      this.new = false;
    }
  }

  setSlug(title) {
    if (title && title.length) {
      this.project.slug = title.toLowerCase()
        .replace(/&/g, 'and')
        .replace(/%/g, 'percent')
        .replace(/\+/g, 'plus')
        .replace(/=/g, 'equals')
        .replace(/[~`!@#$^*(){}[\]/\\|<>'";:,?®™–—]|(\.+$)/g, '')
        .replace(/(\s*\-\s*)|(\.\s*)|\.+/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .replace(/(\s+$)/g, '')
        .split(' ').join('-');

      if (!this.project.meta_title) {
        this.project.meta_title = title;
      }
    }
  }

  setMetaTitle(title) {
    if (title.length) {
      if (title.indexOf(' | automätik') > -1 || title.indexOf(' | automatik') > -1) {
        this.suffix = true;
      } else {
        this.suffix = false;
      }
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  chooseImage(field, idx?) {
    const modal = this.modalService.open(ImageUploaderComponent, this.modalOptions);
    modal.afterClosed()
      .subscribe(
        result => {
          if (result) {
            this.getImages();

            if (field === 'title_lg') {
              this.project.title_image_lg = result;
            } else if (field === 'title_md') {
              this.project.title_image_md = result;
            } else if (field === 'title_sm') {
              this.project.title_image_sm = result;
            } else if (field === 'logo') {
              this.project.logo = result;
            } else if (field === 'featured') {
              this.project.featured_image = result;
            } else if (field === 'image') {
              this.imageList[idx] = result;
            }
          }
        },
        error => this.setError(error)
      );
  }

  getImages() {
    this.imageService.getImages()
      .subscribe(
        res => this.images = res,
        err => this.setError(err)
      );
  }

  getImageAlt(path) {
    const image = this.images.filter(img => img.path === path)[0];
    if (image) {
      return image.alt;
    } else {
      return '';
    }
  }

  addItem(array) {
    // console.log('adding highlight');
    array.push('');
  }

  deleteItem(array, id) {
    // console.log('deleting highlight');
    array.splice(id, 1);
  }

  submit(data, isValid) {
    this.submitted = true;

    if (isValid) {
      this.loading = true;
      this.project.highlights = this.highlightList;
      this.project.images = this.imageList;

      if (this.new) {
        this.projectService.validateProject(this.project)
          .subscribe(
            res => {
              if (res.isValid) {
                this.projectService.createProject(this.project)
                  .subscribe(
                    newRes => {
                      this.success = true;
                      this.loading = false;
                    },
                    newErr => this.setError('New project error: ' + newErr)
                  );
              } else {
                this.invalid = true;
                this.setError('Please fix errors above');
              }
            },
            err => this.setError('Validation error: ' + err)
          );
      } else {
        this.projectService.updateProject(this.project)
          .subscribe(
            res => {
              this.success = true;
              this.loading = false;
            },
            err => this.setError('Update project error: ' + err)
          );
      }
    }
  }

  addAnother() {
    this.project = new Project();
    this.highlightList = new Array<string>(3).fill('');
    this.imageList = new Array<string>(3).fill('');
    this.submitted = false;
    this.success = false;
  }

  editAgain() {
    this.submitted = false;
    this.success = false;
  }

  setError(err) {
    this.error = err;
    console.error(err);
    this.loading = false;
  }
}
