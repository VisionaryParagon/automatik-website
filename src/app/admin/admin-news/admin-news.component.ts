import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { NewsArticle } from '../../services/classes';
import { AdminService } from '../../services/admin.service';
import { NewsService } from '../../services/news.service';

import { FadeAnimation, TopDownAnimation } from '../../animations';

import { NewsFormComponent } from '../modals/news-form/news-form.component';
import { NewsDeleteComponent } from '../modals/news-delete/news-delete.component';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class AdminNewsComponent implements OnInit {
  // admin = this.adminService.state;
  news: NewsArticle[];
  dataSource: MatTableDataSource<NewsArticle>;
  displayedColumns: string[] = [
    'date',
    'source',
    'title',
    'url'
  ];
  pageIndex = 0;
  selectedArticle: NewsArticle = new NewsArticle();
  filter = '';
  filterTimeout: any;
  sorter = 'date';
  sortOrder = 'desc';
  loading = true;
  error = false;

  @ViewChild('tableFunctions') tableFunctions: ElementRef;
  @ViewChild('tableContainer') tableContainer: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private adminService: AdminService,
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.getArticles();
  }

  @HostListener('window:resize') resize() {
    this.setHeight();
  }

  setHeight() {
    let offset; // header and section padding

    if (window.innerWidth >= 768) {
      offset = 112;
    } else {
      offset = 88;
    }

    this.tableContainer.nativeElement.style.height = window.innerHeight - this.tableFunctions.nativeElement.offsetHeight - offset + 'px';
  }

  scrollTop() {
    document.querySelector('.adminTable').scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth'
    });
  }

  getArticles() {
    this.newsService.getArticles()
      .subscribe(
        res => {
          this.news = res;
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.search(this.filter);
          this.setHeight();
          this.loading = false;
        },
        err => this.showError()
      );
  }

  sortData(data) {
    this.sorter = data.active;
    this.sortOrder = data.direction;
  }

  search(data) {
    this.loading = true;

    if (this.filterTimeout) {
      clearTimeout(this.filterTimeout);
    }

    this.filterTimeout = setTimeout(() => {
      this.dataSource.filter = data.trim().toLowerCase();
      this.news = this.dataSource.filteredData;
      this.pageIndex = 0;
      this.scrollTop();
      this.loading = false;
    }, 1000);
  }

  clearFilter() {
    this.filter = '';
    this.search(this.filter);
  }

  select(article) {
    this.selectedArticle === article ? this.selectedArticle = new NewsArticle() : this.selectedArticle = article;
  }

  newArticle() {
    const dialogRef = this.dialog.open(NewsFormComponent, {
      data: new NewsArticle(),
      maxHeight: '90vh',
      maxWidth: '90vw',
      width: '768px'
    });

    dialogRef.afterClosed()
      .subscribe(
        data => {
          this.loading = true;
          this.selectedArticle = new NewsArticle();
          this.getArticles();
        }
      );
  }

  editArticle(article) {
    const dialogRef = this.dialog.open(NewsFormComponent, {
      data: article,
      maxHeight: '90vh',
      maxWidth: '90vw',
      width: '768px'
    });

    dialogRef.afterClosed()
      .subscribe(
        data => {
          this.loading = true;
          this.selectedArticle = new NewsArticle();
          this.getArticles();
        }
      );
  }

  deleteArticle(article) {
    const dialogRef = this.dialog.open(NewsDeleteComponent, {
      data: article,
      maxHeight: '90vh',
      maxWidth: '90vw',
      width: '768px'
    });

    dialogRef.afterClosed()
      .subscribe(
        data => {
          this.loading = true;
          this.selectedArticle = new NewsArticle();
          this.getArticles();
        }
      );
  }

  showError() {
    this.error = true;
    this.loading = false;
  }

  hideError() {
    this.error = false;
  }
}
