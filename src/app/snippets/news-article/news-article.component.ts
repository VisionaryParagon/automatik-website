import { Component, Input, OnInit } from '@angular/core';

import { NewsArticle } from '../../services/classes';

@Component({
  selector: 'news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.scss']
})
export class NewsArticleComponent implements OnInit {
  @Input() article: NewsArticle;

  constructor() { }

  ngOnInit() {
  }
}
