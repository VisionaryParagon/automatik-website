import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { NewsArticle } from '../../../services/classes';
import { NewsService } from '../../../services/news.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-news-delete',
  templateUrl: './news-delete.component.html',
  styleUrls: ['./news-delete.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class NewsDeleteComponent implements OnInit {
  article: NewsArticle = new NewsArticle();
  loading = false;
  success = false;
  error = '';

  constructor(
    private newsService: NewsService,
    @Inject(MAT_DIALOG_DATA) public data: NewsArticle
  ) { }

  ngOnInit() {
    if (this.data) {
      this.article = this.data;
    }
  }

  delete() {
    this.loading = true;
    this.newsService.deleteArticle(this.article)
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
