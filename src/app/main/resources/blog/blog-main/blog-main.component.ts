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
  categories;
  authors;
  loading = true;
  filteredBlogs;
  filterOpen = false;
  filter = '';
  hovered = '';
  activeCat = '';
  activeAuthor = '';
  width: number;
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
      this.categories = this.blogService.categories;
      this.authors = this.blogService.authors;

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
    }

    if (isPlatformBrowser(this.platformId)) {
      this.width = window.innerWidth;
    }
  }

  @HostListener('window:resize', ['$event']) onResize(ev) {
    const w = window.innerWidth;

    if (w !== this.width) {
      this.setTilePosition();
      this.width = w;
    }
  }
  @HostListener('window:scroll', ['$event']) onScroll(ev) {
    const tileBoxHeight = this.tileBox.nativeElement.getBoundingClientRect().height;
    let scrollHeight = window.innerHeight + window.scrollY;

    if (document.documentElement.classList.contains('mobile')) {
      scrollHeight = scrollHeight - 50;
    } else {
      scrollHeight = scrollHeight - 60;
    }

    if (window.innerWidth >= 1200) {
      if (scrollHeight >= tileBoxHeight) {
        this.sidebar.nativeElement.style.top = tileBoxHeight - scrollHeight + 'px';
      } else {
        this.sidebar.nativeElement.style.top = '0px';
      }
    }
  }

  checkData() {
    if (this.blogs && this.categories && this.authors) {
      this.loading = false;

      this.setTilePosition();
    } else {
      this.loading = true;
    }
  }

  setTilePosition() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

      setTimeout(() => {
        if (window.innerWidth >= 1200) {
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
        } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
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

  getImageSrc(blog) {
    if (this.blogs) {
      const src = blog._embedded['wp:featuredmedia']['0'].source_url;

      if (src) {
        return src;
      } else {
        return 'https://assets.automatik9dots.com/images/home-car-drifting-bg-900.jpg';
      }
    }
  }

  getImageAlt(blog) {
    if (this.blogs) {
      const alt = blog._embedded['wp:featuredmedia'][0].alt_text;

      if (alt) {
        return alt;
      } else {
        return 'automätik';
      }
    }
  }

  getAuthor(blog) {
    if (this.blogs) {
      const author = blog._embedded['author'][0].name;

      if (author) {
        return author;
      } else {
        return 'automätik';
      }
    }
  }

  truncateDesc(desc) {
    const arr = desc.split(' ');

    if (arr.length > 20) {
      return arr.slice(0, 20).join(' ') + '...';
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
