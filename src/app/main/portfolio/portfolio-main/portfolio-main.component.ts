import { Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Image, Project } from '../../../services/classes';
import { ImageService } from '../../../services/image.service';
import { ProjectService } from '../../../services/project.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-portfolio-main',
  templateUrl: './portfolio-main.component.html',
  styleUrls: ['./portfolio-main.component.css'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class PortfolioMainComponent implements OnInit {
  projects: Project[] = this.projectService.projects;
  filteredProjects: Project[];
  categories: string[];
  images: Image[] = this.imageService.images;
  filter = '';
  hovered = '';
  activeCat = '';
  projectsLoaded = false;
  imagesLoaded = false;
  loading = true;
  filterOpen = false;
  error = '';

  @ViewChild('sidebar') sidebar: ElementRef;
  @ViewChild('tileBox') tileBox: ElementRef;
  @ViewChildren('tiles') tiles: QueryList<ElementRef>;

  constructor(
    private renderer: Renderer2,
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

  @HostListener('window:resize', ['$event']) onResize(ev) {
    this.setTilePosition();
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

  setProjects(prj) {
    this.projects = [...this.projectSort(prj)];
    this.filteredProjects = this.projectSort(prj);
    this.categories = prj.map(project => project.category).filter((cat, idx, arr) => {
      return arr.indexOf(cat) === idx;
    });
    if (this.projectService.selectedCategory.length) {
      this.selectCategory(this.projectService.selectedCategory);
    }
    if (this.projectService.filter.length) {
      this.filter = this.projectService.filter;
      this.updateFilter();
    }
    this.projectsLoaded = true;
    this.checkData();
  }

  projectSort(projects) {
    projects.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      return 0;
    });

    return projects;
  }

  checkData() {
    if (this.projectsLoaded && this.imagesLoaded) {
      if (!this.projects.length) {
        this.setError('There are currently no projects available.');
      }
      this.loading = false;

      this.setTilePosition();
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

  getImageAlt(path) {
    if (this.images) {
      return this.images.filter(img => img.path === path)[0].alt;
    }
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
      filtered = this.filteredProjects.filter(d => JSON.stringify(Object.values(d)).toLowerCase().indexOf(val) !== -1);
    } else {
      filtered = this.filteredProjects.filter(prj => prj.category === this.activeCat).filter(d => JSON.stringify(Object.values(d)).toLowerCase().indexOf(val) !== -1);
    }

    this.projectService.filter = this.filter;
    this.projects = filtered;
    this.setTilePosition();
  }

  clearFilter() {
    this.filter = '';
    this.updateFilter();
  }

  selectCategory(cat?) {
    this.clearFilter();

    if (cat) {
      this.projectService.selectedCategory = cat;
      this.activeCat = cat;
      this.projects = this.filteredProjects.filter(prj => prj.category === cat);
    } else {
      this.projectService.selectedCategory = '';
      this.activeCat = '';
      this.projects = this.filteredProjects;
    }

    this.closePanel();
    this.setTilePosition();
  }

  setError(err) {
    this.error = err;
    console.error(err);
  }
}
