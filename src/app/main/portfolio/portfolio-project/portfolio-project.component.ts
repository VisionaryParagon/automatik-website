import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';

import { Image, Project, Seo } from '../../../services/classes';
import { ImageService } from '../../../services/image.service';
import { ProjectService } from '../../../services/project.service';
import { SeoService } from '../../../services/seo.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-portfolio-project',
  templateUrl: './portfolio-project.component.html',
  styleUrls: ['./portfolio-project.component.css'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class PortfolioProjectComponent implements OnInit {
  slug = this.route.snapshot.params.slug;
  metadata: Seo;
  projects: Project[] = this.projectService.projects;
  project: Project;
  images: Image[] = this.imageService.images;
  projectImages;
  projectsLoaded = false;
  imagesLoaded = false;
  lg = false;
  md = false;
  sm = false;
  imgHeight = 'auto';
  imgWidth = '100%';
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService,
    private imageService: ImageService,
    private projectService: ProjectService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    if (this.projects) {
      this.setProjects(this.projects);
    } else {
      this.projectService.getProjects()
        .subscribe(
          res => this.setProjects(res),
          err => this.setError('Could not get projects: ' + err)
        );
    }

    if (this.images) {
      this.imagesLoaded = true;
      this.checkData();
    } else {
      this.imageService.getImages()
        .subscribe(
          res => {
            this.images = res;
            this.imagesLoaded = true;
            this.checkData();
          },
          err => this.setError('Could not get images: ' + err)
        );
    }
  }

  setProjects(data) {
    this.projects = data;
    this.project = this.projects.filter(prj => prj.slug === this.slug)[0];
    if (this.project) {
      this.setSEO(this.project);
    } else {
      this.setSEO();
      this.setError('Sorry! This project doesn’t exist.');
    }
    this.projectImages = {
      sm: this.project.title_image_sm,
      md: this.project.title_image_md,
      lg: this.project.title_image_lg
    };
    this.projectsLoaded = true;
    this.checkData();
  }

  setSEO(data?) {
    if (data) {
      this.metadata = {
        title: data.meta_title + ' | automätik',
        metatags: [
          {
            name: 'description',
            content: data.description
          },
          {
            name: 'keywords',
            content: data.keywords
          },
          {
            property: 'og:title',
            content: data.meta_title + ' | automätik'
          },
          {
            property: 'og:type',
            content: 'website'
          },
          {
            property: 'og:url',
            content: 'https://beta.automatik9dots.com/portfolio/' + data.slug
          },
          {
            property: 'og:image',
            content: data.title_image_lg
          },
          {
            property: 'og:description',
            content: data.description
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
            content: data.meta_title + ' | automätik'
          },
          {
            name: 'twitter:description',
            content: data.description
          },
          {
            name: 'twitter:image:src',
            content: data.title_image_lg
          }
        ]
      };

      this.seoService.addDynamicSeoData(this.metadata);
    } else {
      this.seoService.addDynamicSeoData();
    }
  }

  checkData() {
    if (this.projectsLoaded && this.imagesLoaded) {
      if (!this.projects.length) {
        this.setError('There are currently no projects available.');
      }
      this.loading = false;
    }
  }

  getImageAlt(path) {
    if (this.images) {
      return this.images.filter(img => img.path === path)[0].alt;
    }
  }

  setError(err) {
    this.error = err;
    console.error(err);
  }
}
