import { Component, OnInit } from '@angular/core';

import { NewsArticle } from '../../../services/classes';
import { NewsService } from '../../../services/news.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class NewsComponent implements OnInit {
  heroImages = {
    sm: 'https://assets.automatik.com/images/home-car-drifting-bg-900.jpg',
    md: 'https://assets.automatik.com/images/home-car-drifting-bg-1440.jpg',
    lg: 'https://assets.automatik.com/images/home-car-drifting-bg-2560.jpg'
  };
  news: NewsArticle[] = new Array<NewsArticle>();
  filteredNews: NewsArticle[];
  filter = '';
  loading = true;
  error = '';

  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.newsService.getArticles()
      .subscribe(
        res => {
          this.news = res.sort((a, b) => {
            const aDate = new Date(a.date);
            const bDate = new Date(b.date);
            return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
          });
          this.filteredNews = [...this.news];
          this.loading = false;
        },
        err => this.setError(err)
      );
  }

  updateFilter() {
    const val = this.filter.toLowerCase();
    let filtered = [];

    filtered = this.filteredNews.filter(d => JSON.stringify(Object.values(d)).toLowerCase().indexOf(val) !== -1);

    this.newsService.filter = this.filter;
    this.news = filtered;
  }

  clearFilter() {
    this.filter = '';
    this.updateFilter();
  }

  setError(err) {
    this.error = err;
    console.error(err);
  }
}
