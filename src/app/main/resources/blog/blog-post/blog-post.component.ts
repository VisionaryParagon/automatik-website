import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Seo } from '../../../../services/classes';
import { BlogService } from '../../../../services/blog.service';
import { SeoService } from '../../../../services/seo.service';

import { FadeAnimation } from '../../../../animations';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css'],
  animations: [ FadeAnimation ]
})
export class BlogPostComponent implements OnInit {
  slug = this.route.snapshot.params.slug;
  post;
  blogs;
  media;
  categories;
  authors;
  tags;
  metadata: Seo;
  safeHtml: SafeHtml;
  atTop = true;
  changingBlog = false;
  imgHeight = 'auto';
  imgWidth = '100%';
  loading = true;
  error = '';

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    if (this.blogService.dataRetrieved) {
      this.blogs = this.blogService.blogs;
      this.media = this.blogService.media;
      this.categories = this.blogService.categories;
      this.authors = this.blogService.authors;
      this.tags = this.blogService.tags;
      this.post = this.blogs.filter(post => post.slug === this.slug)[0];
      this.sanitizeHtml(this.post.content.rendered);
      this.setSEO(this.post);
      this.loading = false;
    } else {
      this.blogService.getPosts()
        .subscribe(
          posts => {
            this.blogs = this.blogService.blogs;
            console.log('Blogs: ', this.blogs);
            this.checkData();
          },
          error => this.setError(error)
        );
      this.blogService.getMedia()
        .subscribe(
          media => {
            this.media = this.blogService.media;
            console.log('Media: ', this.media);
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

    this.router.events.subscribe((ev: any) => {
      if (ev instanceof NavigationEnd) {
        if (ev.url.indexOf('/resources/blog/') === 0 && ev.url.indexOf(this.slug) === -1) {
          this.changingBlog = true;

          setTimeout(() => {
            this.slug = ev.url.split('/').pop();
            this.post = this.blogs.filter(post => post.slug === this.slug)[0];
            this.sanitizeHtml(this.post.content.rendered);
            this.setSEO(this.post);

            setTimeout(() => {
              this.changingBlog = false;
            }, 250);
          }, 250);
        }
      }
    });

    this.checkBanner();
  }

  @HostListener('window:resize', ['$event']) onResize(ev) {
    this.checkBanner();
  }
  @HostListener('window:scroll', ['$event']) onScroll(ev) {
    this.checkScroll();
  }

  scrollPage() {
    if (isPlatformBrowser(this.platformId)) {
      let scrl = window.innerHeight;
      if (document.documentElement.classList.contains('mobile')) {
        scrl = scrl - 50;
      } else {
        scrl = scrl - 60;
      }
      window.scroll({top: scrl, left: 0, behavior: 'smooth'});
    }
  }

  checkScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.atTop = window.scrollY > 50 ? false : true;
    }
  }

  checkData() {
    if (this.blogs && this.media && this.categories && this.authors && this.tags) {
      this.post = this.blogs.filter(post => post.slug === this.slug)[0];
      this.sanitizeHtml(this.post.content.rendered);
      this.setSEO(this.post);
      this.loading = false;
    } else {
      this.loading = true;
    }
  }

  setSEO(data?) {
    if (data) {
      const seoImg = this.getImageSrc(data.featured_media);
      // console.log(data.yoast);

      this.metadata = {
        title: data.yoast.title,
        metatags: [
          {
            name: 'description',
            content: data.yoast.metadesc
          },
          {
            name: 'keywords',
            content: data.yoast.metakeywords
          },
          {
            property: 'og:title',
            content: data.yoast.title
          },
          {
            property: 'og:type',
            content: 'article'
          },
          {
            property: 'og:url',
            content: 'https://beta.automatik9dots.com/portfolio/' + data.slug
          },
          {
            property: 'og:image',
            content: seoImg
          },
          {
            property: 'og:description',
            content: data.yoast.metadesc
          },
          {
            name: 'twitter:card',
            content: 'summary_large_image'
          },
          {
            name: 'twitter:site',
            content: '@automatikEvents'
          },
          {
            name: 'twitter:title',
            content: data.yoast.title
          },
          {
            name: 'twitter:description',
            content: data.yoast.metadesc
          },
          {
            name: 'twitter:image:src',
            content: seoImg
          }
        ]
      };

      this.seoService.addDynamicSeoData(this.metadata);
    } else {
      this.seoService.addDynamicSeoData();
    }
  }

  checkBanner() {
    if (isPlatformBrowser(this.platformId)) {
      if (window.innerWidth * 0.565 < window.innerHeight) {
        this.imgHeight = '100%';
        this.imgWidth = 'auto';
      } else {
        this.imgHeight = 'auto';
        this.imgWidth = '100%';
      }
    }
  }

  getImageSrc(id) {
    if (this.media) {
      return this.blogService.media.filter(media => media.id === id)[0].source_url;
    }
  }

  getImageAlt(id) {
    if (this.media) {
      return this.blogService.media.filter(media => media.id === id)[0].alt_text;
    }
  }

  getAuthor(id) {
    if (this.authors) {
      return this.blogService.authors.filter(author => author.id === id)[0].name;
    }
  }

  goToAuthor(author) {
    this.blogService.selectedAuthor = this.getAuthor(author);
    this.router.navigate(['/resources/blog']);
  }

  goToCategory(cat?) {
    if (cat) {
      this.blogService.selectedCategory = cat;
    } else {
      this.blogService.selectedCategory = '';
    }
    this.router.navigate(['/resources/blog']);
  }

  sanitizeHtml(data) {
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(data);
  }

  setError(err) {
    this.error = err;
    console.error(err);
  }
}
