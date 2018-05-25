import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { DomSanitizer, SafeHtml, Meta, Title } from '@angular/platform-browser';

import { BlogService } from '../../../../services/blog.service';

import { FadeAnimation } from '../../../../animations';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css'],
  animations: [ FadeAnimation ]
})
export class BlogPostComponent implements OnInit {
  slug = this.route.snapshot.params.slug;
  defaultTitle = 'automätik blog';
  defaultDesc = 'Eradicating boring corporate events from the face of the Earth.';
  changingBlog = false;
  post;
  safeHtml: SafeHtml;
  categories;
  tags;
  authors;
  media;
  blogs;
  error;

  constructor(
    private sanitizer: DomSanitizer,
    private metaService: Meta,
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) { }

  ngOnInit() {
    if (this.blogService.dataRetrieved) {
      this.categories = this.blogService.categories;
      this.tags = this.blogService.tags;
      this.authors = this.blogService.authors;
      this.media = this.blogService.media;
      this.blogs = this.blogService.blogs;
      this.post = this.blogs.filter(post => post.slug === this.slug)[0];
      this.sanitizeHtml(this.post.content.rendered);
      this.setSEO(this.post.yoast);
    } else {
      this.blogService.getCategories()
        .subscribe(
          categories => {
            this.categories = this.blogService.categories;
            // console.log(this.categories);
            this.blogService.getTags()
              .subscribe(
                tags => {
                  this.tags = this.blogService.tags;
                  // console.log(this.tags);
                  this.blogService.getAuthors()
                    .subscribe(
                      authors => {
                        this.authors = this.blogService.authors;
                        // console.log(this.authors);
                        this.blogService.getMedia()
                          .subscribe(
                            media => {
                              this.media = this.blogService.media;
                              // console.log(this.media);
                              this.blogService.getPosts()
                                .subscribe(
                                  posts => {
                                    this.blogs = this.blogService.blogs;
                                    // console.log(this.blogs);
                                    this.post = this.blogs.filter(post => post.slug === this.slug)[0];
                                    this.sanitizeHtml(this.post.content.rendered);
                                    this.setSEO(this.post.yoast);
                                  },
                                  error => this.setError(error)
                                );
                            },
                            error => this.setError(error)
                          );
                      },
                      error => this.setError(error)
                    );
                },
                error => this.setError(error)
              );
          },
          error => this.setError(error)
        );
    }

    this.router.events.subscribe((ev: any) => {
      if (ev instanceof NavigationEnd) {
        if (ev.url.indexOf('/resources/blog/post') === 0 && ev.url.indexOf(this.slug) === -1) {
          this.changingBlog = true;

          setTimeout(() => {
            this.slug = ev.url.split('/').reverse()[0];
            this.post = this.blogs.filter(post => post.slug === this.slug)[0];
            this.sanitizeHtml(this.post.content.rendered);
            this.setSEO(this.post.yoast);

            setTimeout(() => {
              this.changingBlog = false;
            }, 250);
          }, 250);
        }
      }
    });
  }

  setSEO(data) {
    if (data.title.length) {
      this.titleService.setTitle(data.title);
    } else {
      this.titleService.setTitle(this.defaultTitle);
    }

    if (data.metadesc.length) {
      this.metaService.addTag({ name: 'description', content: data.metadesc });
    } else {
      this.metaService.addTag({ name: 'description', content: this.defaultDesc });
    }
  }

  getFeaturedImgSrc(id) {
    if (this.blogService.media) {
      return this.blogService.media.filter(media => media.id === id)[0].source_url;
    }
  }

  getFeaturedImgAlt(id) {
    if (this.blogService.media) {
      return this.blogService.media.filter(media => media.id === id)[0].alt_text;
    }
  }

  getAuthor(id) {
    if (this.blogService.authors) {
      return this.blogService.authors.filter(author => author.id === id)[0].name;
    }
  }

  getAuthorSlug(id) {
    if (this.blogService.authors) {
      return this.blogService.authors.filter(author => author.id === id)[0].slug;
    }
  }

  sanitizeHtml(data) {
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(data);
  }

  setError(err) {
    this.error = err;
    console.error(err);
  }
}
