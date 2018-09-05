import { Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { BlogService } from '../../../../services/blog.service';

import { FadeAnimation, TopDownAnimation } from '../../../../animations';

@Component({
  selector: 'app-blog',
  templateUrl: './blog-main.component.html',
  styleUrls: ['./blog-main.component.css'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class BlogMainComponent implements OnInit {
  blogs;
  media;
  categories;
  authors;
  tags;
  loading = true;
  filteredBlogs;
  filterOpen = false;
  filter = '';
  hovered = '';
  activeCat = '';
  activeAuthor = '';
  anyVal: any;
  error = '';

  @ViewChild('sidebar') sidebar: ElementRef;
  @ViewChild('tileBox') tileBox: ElementRef;
  @ViewChildren('tiles') tiles: QueryList<ElementRef>;

  constructor(
    private renderer: Renderer2,
    private blogService: BlogService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    if (this.blogService.dataRetrieved) {
      this.filteredBlogs = [...this.blogService.blogs];
      this.media = this.blogService.media;
      this.categories = this.blogService.categories;
      this.authors = this.blogService.authors;
      this.tags = this.blogService.tags;

      if (this.blogService.filter.length) {
        this.filter = this.blogService.filter;
        this.updateFilter();
      } else if (this.blogService.selectedCategory.length) {
        this.selectCategory(this.blogService.selectedCategory);
      } else if (this.blogService.selectedAuthor.length) {
        this.selectAuthor(this.blogService.selectedAuthor);
      } else {
        this.blogs = this.blogService.blogs;
        this.setTilePosition();
      }

      this.loading = false;
    } else {
      this.blogService.getPosts()
        .subscribe(
          posts => {
            this.blogs = this.blogService.blogs;
            this.filteredBlogs = [...this.blogService.blogs];
            // console.log('Blogs: ', this.blogs);
            this.checkData();
          },
          error => this.setError(error)
        );
      this.blogService.getMedia()
        .subscribe(
          media => {
            this.media = this.blogService.media;
            // console.log('Media: ', this.media);
            this.checkData();
          },
          error => this.setError(error)
        );
      this.blogService.getCategories()
        .subscribe(
          categories => {
            this.categories = this.blogService.categories;
            // console.log('Categories: ', this.categories);
            this.checkData();
          },
          error => this.setError(error)
        );
      this.blogService.getAuthors()
        .subscribe(
          authors => {
            this.authors = this.blogService.authors;
            // console.log('Authors: ', this.authors);
            this.checkData();
          },
          error => this.setError(error)
        );
      this.blogService.getTags()
        .subscribe(
          tags => {
            this.tags = this.blogService.tags;
            // console.log('Tags: ', this.tags);
            this.checkData();
          },
          error => this.setError(error)
        );
    }
  }

  @HostListener('window:resize', ['$event']) onResize(ev) {
    this.setTilePosition();
  }
  @HostListener('window:scroll', ['$event']) onScroll(ev) {
    const tileBoxHeight = this.tileBox.nativeElement.getBoundingClientRect().height;
    const scrollHeight = window.innerHeight - 60 + window.scrollY;
    if (!document.documentElement.classList.contains('mobile')) {
      if (scrollHeight >= tileBoxHeight) {
        this.sidebar.nativeElement.style.top = tileBoxHeight - scrollHeight + 'px';
      } else {
        this.sidebar.nativeElement.style.top = '0px';
      }
    }
  }

  checkData() {
    if (this.blogs && this.media && this.categories && this.authors && this.tags) {
      this.loading = false;

      this.setTilePosition();
    } else {
      this.loading = true;
    }
  }

  setTilePosition() {
    if (isPlatformBrowser(this.platformId)) {
      window.scroll({top: 0, left: 0, behavior: 'smooth'});

      setTimeout(() => {
        if (window.outerWidth >= 1200) {
          if (this.tiles.length) {
            this.tiles.forEach((el, idx) => {
              const x = idx % 3;
              const y = Math.floor(idx / 3.0);
              const height = el.nativeElement.getBoundingClientRect().height;
              const width = el.nativeElement.getBoundingClientRect().width;

              el.nativeElement.style.left = x * width + 'px';
              el.nativeElement.style.top = y * height + 'px';
            });

            this.tileBox.nativeElement.style.height = this.tiles.first.nativeElement.getBoundingClientRect().height * Math.ceil(this.tiles.length / 3.0) + 'px';
          } else {
            if (document.documentElement.classList.contains('mobile')) {
              this.tileBox.nativeElement.style.height = window.innerHeight - 50 + 'px';
            } else {
              this.tileBox.nativeElement.style.height = window.innerHeight - 60 + 'px';
            }
          }
        } else if (window.outerWidth >= 768 && window.outerWidth < 1200) {
          if (this.tiles.length) {
            this.tiles.forEach((el, idx) => {
              const x = idx % 2;
              const y = Math.floor(idx / 2.0);
              const height = el.nativeElement.getBoundingClientRect().height;
              const width = el.nativeElement.getBoundingClientRect().width;

              el.nativeElement.style.left = x * width + 'px';
              el.nativeElement.style.top = y * height + 'px';
            });

            this.tileBox.nativeElement.style.height = this.tiles.first.nativeElement.getBoundingClientRect().height * Math.ceil(this.tiles.length / 2.0) + 'px';
          } else {
            if (document.documentElement.classList.contains('mobile')) {
              this.tileBox.nativeElement.style.height = window.innerHeight - 50 + 'px';
            } else {
              this.tileBox.nativeElement.style.height = window.innerHeight - 60 + 'px';
            }
          }
        } else {
          this.tiles.forEach((el, idx) => {
            el.nativeElement.style.left = '0px';
            el.nativeElement.style.top = '0px';
          });

          this.tileBox.nativeElement.style.height = 'auto';
        }
      }, 250);
    }
  }

  getImageSrc(id) {
    if (this.media) {
      return this.media.filter(media => media.id === id)[0].media_details.sizes.medium_large.source_url;
    }
  }

  getImageAlt(id) {
    if (this.media) {
      return this.media.filter(media => media.id === id)[0].alt_text;
    }
  }

  getAuthor(id) {
    if (this.authors) {
      return this.authors.filter(author => author.id === id)[0].name;
    }
  }

  truncateDesc(desc) {
    const arr = desc.split(' ');

    if (arr.length > 30) {
      return arr.slice(0, 30).join(' ') + '...';
    }
    return desc;
  }

  setHover(id) {
    if (this.hovered !== id) {
      this.hovered = id;
    }
  }

  openPanel() {
    this.filterOpen = true;
    this.setModalClass();
  }

  closePanel() {
    this.filterOpen = false;
    this.setModalClass();
  }

  setModalClass() {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.filterOpen) {
        this.renderer.removeClass(document.documentElement, 'modal-open');
      } else {
        this.renderer.addClass(document.documentElement, 'modal-open');
      }
    }
  }

  updateFilter() {
    const val = this.filter.toLowerCase();
    let filtered = [];

    if (this.activeCat.length === 0) {
      filtered = this.filteredBlogs.filter(d => JSON.stringify(Object.values(d)).toLowerCase().indexOf(val) !== -1);
    } else {
      filtered = this.filteredBlogs.filter(blg => blg.category === this.activeCat).filter(d => JSON.stringify(Object.values(d)).toLowerCase().indexOf(val) !== -1);
    }

    this.blogService.filter = this.filter;
    this.blogs = filtered;
    this.setTilePosition();
  }

  clearFilter() {
    this.filter = '';
    this.updateFilter();
  }

  selectCategory(cat?) {
    if (this.filter.length) {
      this.clearFilter();
    }
    if (this.activeAuthor.length) {
      this.selectAuthor();
    }

    if (cat) {
      const catId = this.categories.filter(ct => ct.name === cat)[0].id;

      this.blogService.selectedCategory = cat;
      this.activeCat = cat;
      this.blogs = this.filteredBlogs.filter(blg => blg.categories.indexOf(catId) > -1);
    } else {
      this.blogService.selectedCategory = '';
      this.activeCat = '';
      this.blogs = this.filteredBlogs;
    }

    this.closePanel();
    this.setTilePosition();
  }

  selectAuthor(author?) {
    if (this.filter.length) {
      this.clearFilter();
    }
    if (this.activeCat.length) {
      this.selectCategory();
    }

    if (author) {
      const authId = this.authors.filter(auth => auth.name === author)[0].id;

      this.blogService.selectedAuthor = author;
      this.activeAuthor = author;
      this.blogs = this.filteredBlogs.filter(blg => blg.author === authId);
    } else {
      this.blogService.selectedAuthor = '';
      this.activeAuthor = '';
      this.blogs = this.filteredBlogs;
    }

    this.closePanel();
    this.setTilePosition();
  }

  setError(err) {
    this.error = err;
    console.error(err);
  }
}
