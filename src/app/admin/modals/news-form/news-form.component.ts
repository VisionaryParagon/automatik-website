import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { NewsArticle } from '../../../services/classes';
import { NewsService } from '../../../services/news.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

import { ImageUploaderComponent } from '../image-uploader/image-uploader.component';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class NewsFormComponent implements OnInit {
  article: NewsArticle = new NewsArticle();
  new = true;
  timeout: any;
  hasData = false;
  manualEdit = false;
  dataLoading = false;
  loading = false;
  submitted = false;
  success = false;
  invalid = false;
  error = '';

  modalOptions = {
    maxHeight: '90%',
    maxWidth: '768px',
    width: '90%'
  };

  constructor(
    private modalService: MatDialog,
    private newsService: NewsService,
    @Inject(MAT_DIALOG_DATA) public data: NewsArticle
  ) { }

  ngOnInit() {
    if (this.data._id) {
      this.article = this.data;
      this.new = false;
      this.hasData = true;
    }
  }

  fetchData() {
    this.dataLoading = true;

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.newsService.getArticleData(this.article)
        .subscribe(
          res => {
            this.article.title = res.title;
            this.article.description = res.description;
            this.article.image = res.image;
            this.article.date = isNaN(new Date(res['article:published_time']).getTime()) ? new Date() : new Date(res['article:published_time']);
            this.article.source = res.source;
            this.hasData = true;
            this.dataLoading = false;
          }
        );
    }, 1000);
  }

  editData() {
    this.manualEdit = true;
  }

  chooseImage(field) {
    const modal = this.modalService.open(ImageUploaderComponent, this.modalOptions);
    modal.afterClosed()
      .subscribe(
        result => {
          if (result) {
            if (field === 'image') {
              this.article.image = result;
            }
          }
        },
        error => this.setError(error)
      );
  }

  submit(data, isValid) {
    this.submitted = true;

    if (isValid) {
      this.loading = true;

      if (this.new) {
        this.newsService.createArticle(this.article)
          .subscribe(
            res => {
              this.success = true;
              this.loading = false;
            },
            err => this.setError('New article error: ' + err)
          );
      } else {
        this.newsService.updateArticle(this.article)
          .subscribe(
            res => {
              this.success = true;
              this.loading = false;
            },
            err => this.setError('Update article error: ' + err)
          );
      }
    }
  }

  addAnother() {
    this.article = new NewsArticle();
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
