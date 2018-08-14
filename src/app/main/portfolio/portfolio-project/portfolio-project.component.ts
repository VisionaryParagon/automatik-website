import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
  metadata: Seo = new Seo();
  projects: Project[] = this.projectService.projects;
  project: Project;
  images: Image[] = this.imageService.images;
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
    private sanitizer: DomSanitizer,
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

    this.checkBanner();
  }

  @HostListener('window:resize', ['$event']) onResize(ev) {
    this.checkBanner();
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
    this.projectsLoaded = true;
    this.checkData();
  }

  setSEO(data?) {
    if (data) {
      // Set title
      this.metadata.title = data.title + ' | automätik';

      // Set meta tags
      this.metadata.metatags.push({
        name: 'description',
        content: data.description
      });
      this.metadata.metatags.push({
        name: 'keywords',
        content: data.keywords
      });

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

  checkBanner() {
    if (isPlatformBrowser(this.platformId)) {
      if (window.innerWidth >= 1200) {
        this.lg = true;
        this.md = false;
        this.sm = false;
      } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
        this.lg = false;
        this.md = true;
        this.sm = false;
      } else {
        this.lg = false;
        this.md = false;
        this.sm = true;
      }

      if (window.innerWidth * 0.565 < window.innerHeight) {
        this.imgHeight = '100%';
        this.imgWidth = 'auto';
      } else {
        this.imgHeight = 'auto';
        this.imgWidth = '100%';
      }
    }
  }

  getImagePath(id) {
    if (this.imagesLoaded) {
      return this.images.filter(img => img._id === id)[0].path;
    }
  }

  getImageAlt(id) {
    if (this.imagesLoaded) {
      return this.images.filter(img => img._id === id)[0].alt;
    }
  }

  setError(err) {
    this.error = err;
    console.error(err);
  }
}
