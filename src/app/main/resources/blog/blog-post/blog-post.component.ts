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
  styleUrls: ['./blog-post.component.scss'],
  animations: [ FadeAnimation ]
})
export class BlogPostComponent implements OnInit {
  slug = this.route.snapshot.params.slug;
  post;
  heroImages = {
    sm: 'https://assets.automatik.com/images/home-car-drifting-bg-900.jpg',
    md: 'https://assets.automatik.com/images/home-car-drifting-bg-1440.jpg',
    lg: 'https://assets.automatik.com/images/home-car-drifting-bg-2560.jpg'
  };
  blogs;
  categories;
  metadata: Seo;
  safeHtml: SafeHtml;
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
      this.categories = this.blogService.categories;
      this.post = this.blogs.filter(post => post.slug === this.slug)[0];
      // console.log(this.post);
      this.heroImages = {
        sm: this.getImageSrc(this.post),
        md: this.getImageSrc(this.post),
        lg: this.getImageSrc(this.post)
      };
      this.sanitizeHtml(this.post.content.rendered);
      this.setSEO(this.post);
      this.loading = false;
    } else {
      this.blogService.getPosts()
        .subscribe(
          posts => {
            this.blogs = this.blogService.blogs;
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
    }

    this.router.events.subscribe((ev: any) => {
      if (ev instanceof NavigationEnd) {
        if (ev.url.indexOf('/resources/blog/') === 0 && ev.url.indexOf(this.slug) === -1) {
          this.changingBlog = true;

          setTimeout(() => {
            this.slug = ev.url.split('/').pop();
            this.checkData();

            setTimeout(() => {
              this.changingBlog = false;
            }, 250);
          }, 250);
        }
      }
    });
  }

  checkData() {
    if (this.blogs && this.categories) {
      this.post = this.blogs.filter(post => post.slug === this.slug)[0];
      // console.log(this.post);
      this.heroImages = {
        sm: this.getImageSrc(this.post),
        md: this.getImageSrc(this.post),
        lg: this.getImageSrc(this.post)
      };
      this.sanitizeHtml(this.post.content.rendered);
      this.setSEO(this.post);
      this.loading = false;
    } else {
      this.loading = true;
    }
  }

  setSEO(data?) {
    if (data) {
      // console.log(data);

      this.metadata = {
        title: data.yoast.title || data.title.rendered + ' | automätik',
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
            content: data.yoast.title || data.title.rendered + ' | automätik'
          },
          {
            property: 'og:type',
            content: 'article'
          },
          {
            property: 'og:url',
            content: 'https://automatik.com/resources/blog/' + data.slug
          },
          {
            property: 'og:image',
            content: data.yoast['opengraph-image'] || this.getImageSrc(data)
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
            content: data.yoast.title || data.title.rendered + ' | automätik'
          },
          {
            name: 'twitter:description',
            content: data.yoast.metadesc
          },
          {
            name: 'twitter:image:src',
            content: data.yoast['twitter-image'] || this.getImageSrc(data)
          }
        ]
      };

      this.seoService.addDynamicSeoData(this.metadata);
    } else {
      this.seoService.addDynamicSeoData();
    }
  }

  getImageSrc(blog) {
    if (this.blogs) {
      const src = blog._embedded['wp:featuredmedia']['0'].source_url;

      if (src) {
        return src;
      } else {
        return 'https://assets.automatik.com/images/home-car-drifting-bg-900.jpg';
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
