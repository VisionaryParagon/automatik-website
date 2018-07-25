import { Component, OnInit } from '@angular/core';

import { BlogService } from '../../../../services/blog.service';

import { FadeAnimation } from '../../../../animations';

@Component({
  selector: 'app-blog',
  templateUrl: './blog-main.component.html',
  styleUrls: ['./blog-main.component.css'],
  animations: [ FadeAnimation ]
})
export class BlogMainComponent implements OnInit {
  categories;
  tags;
  authors;
  media;
  blogs;
  error;

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit() {
    if (this.blogService.dataRetrieved) {
      this.categories = this.blogService.categories;
      this.tags = this.blogService.tags;
      this.authors = this.blogService.authors;
      this.media = this.blogService.media;
      this.blogs = this.blogService.blogs;
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
