import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { DomSanitizer, SafeHtml, Meta, Title } from '@angular/platform-browser';

import { BlogService } from '../../../../services/blog.service';

import { FadeAnimation } from '../../../../animations';

@Component({
  selector: 'app-blog-category',
  templateUrl: './blog-category.component.html',
  styleUrls: ['./blog-category.component.css'],
  animations: [ FadeAnimation ]
})
export class BlogCategoryComponent implements OnInit {
  slug = this.route.snapshot.params.slug;
  defaultTitle = 'automätik blog';
  defaultDesc = 'Eradicating boring corporate events from the face of the Earth.';
  changingCategory = false;
  selectedCategory;
  categorizedBlogs;
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
      this.selectedCategory = this.categories.filter(cat => cat.slug === this.slug)[0];
      this.categorizedBlogs = this.blogs.filter(blog => blog.categories.includes(this.selectedCategory.id));
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
                                    this.selectedCategory = this.categories.filter(cat => cat.slug === this.slug)[0];
                                    this.categorizedBlogs = this.blogs.filter(blog => blog.categories.includes(this.selectedCategory.id));
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
        if (ev.url.indexOf('/resources/blog/category') === 0 && ev.url.indexOf(this.slug) === -1) {
          this.changingCategory = true;

          setTimeout(() => {
            this.slug = ev.url.split('/').reverse()[0];
            this.selectedCategory = this.categories.filter(cat => cat.slug === this.slug)[0];
            this.categorizedBlogs = this.blogs.filter(blog => blog.categories.includes(this.selectedCategory.id));

            setTimeout(() => {
              this.changingCategory = false;
            }, 250);
          }, 250);
        }
      }
    });
  }

  getFeaturedImgSrc(id) {
    if (this.media) {
      return this.media.filter(media => media.id === id)[0].media_details.sizes.medium_large.source_url;
    }
  }

  getFeaturedImgAlt(id) {
    if (this.media) {
      return this.media.filter(media => media.id === id)[0].alt_text;
    }
  }

  getAuthor(id) {
    if (this.authors) {
      return this.authors.filter(author => author.id === id)[0].name;
    }
  }

  setError(err) {
    this.error = err;
    console.error(err);
  }
}