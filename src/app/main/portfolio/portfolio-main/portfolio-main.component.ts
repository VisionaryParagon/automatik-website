import { Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material';

import { Image, Project } from '../../../services/classes';
import { ImageService } from '../../../services/image.service';
import { ProjectService } from '../../../services/project.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

import { ImageUploaderComponent } from '../../modals/image-uploader/image-uploader.component';

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

  project: Project = new Project();
  highlightList: Array<string> = new Array<string>(3).fill('');
  imageList: Array<string> = new Array<string>(3).fill('');
  modalOptions = {
    maxHeight: '90%',
    maxWidth: '768px',
    width: '80%'
  };
  submitted = false;
  formLoading = false;
  success = false;
  invalid = false;

  @ViewChild('sidebar') sidebar: ElementRef;
  @ViewChild('tileBox') tileBox: ElementRef;
  @ViewChildren('tiles') tiles: QueryList<ElementRef>;

  constructor(
    private renderer: Renderer2,
    private modalService: MatDialog,
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
    const scrollHeight = window.innerHeight - 60 + window.scrollY;
    if (window.innerWidth >= 1200) {
      if (scrollHeight >= tileBoxHeight) {
        this.sidebar.nativeElement.style.top = tileBoxHeight - scrollHeight + 'px';
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
      setTimeout(() => {
        if (window.innerWidth >= 1200) {
          this.tiles.forEach((el, idx) => {
            const x = idx % 3;
            const y = Math.floor(idx / 3.0);
            const height = el.nativeElement.getBoundingClientRect().height;
            const width = el.nativeElement.getBoundingClientRect().width;

            el.nativeElement.style.left = x * width + 'px';
            el.nativeElement.style.top = y * height + 'px';
          });

          this.tileBox.nativeElement.style.height = ((window.innerHeight - 60) / 3) * Math.ceil(this.tiles.length / 3.0) + 'px';
        } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
          this.tiles.forEach((el, idx) => {
            const x = idx % 2;
            const y = Math.floor(idx / 2.0);
            const height = el.nativeElement.getBoundingClientRect().height;
            const width = el.nativeElement.getBoundingClientRect().width;

            el.nativeElement.style.left = x * width + 'px';
            el.nativeElement.style.top = y * height + 'px';
          });

          this.tileBox.nativeElement.style.height = ((window.innerHeight - 50) / 3) * Math.ceil(this.tiles.length / 2.0) + 'px';
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
      if (document.body.classList.contains('modal-open')) {
        this.renderer.removeClass(document.body, 'modal-open');
      } else {
        this.renderer.addClass(document.body, 'modal-open');
      }
    }
  }

  updateFilter() {
    const val = this.filter.toLowerCase();
    let filtered = [];

    if (this.activeCat.length === 0) {
      filtered = this.filteredProjects.filter(d => {
        return  d.category.toLowerCase().indexOf(val) !== -1 ||
                d.title.toLowerCase().indexOf(val) !== -1 ||
                d.description.toLowerCase().indexOf(val) !== -1 ||
                d.headline.toLowerCase().indexOf(val) !== -1 ||
                d.copy.toLowerCase().indexOf(val) !== -1;
      });
    } else {
      filtered = this.filteredProjects.filter(prj => prj.category === this.activeCat).filter(d => {
        return  d.title.toLowerCase().indexOf(val) !== -1 ||
                d.description.toLowerCase().indexOf(val) !== -1 ||
                d.headline.toLowerCase().indexOf(val) !== -1 ||
                d.copy.toLowerCase().indexOf(val) !== -1;
      });
    }

    this.projectService.filter = this.filter;
    this.projects = filtered;
    this.setTilePosition();
  }

  clearFilter() {
    this.filter = '';
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



  setSlug(title) {
    if (title.length > 0) {
      this.project.slug = title.toLowerCase()
        .replace(/&/g, 'and')
        .replace(/%/g, 'percent')
        .replace(/\+/g, 'plus')
        .replace(/=/g, 'equals')
        .replace(/[~`!@#$^*(){}[\]/\\|<>'";:,?®™–—]|(\.+$)/g, '')
        .replace(/(\s*\-\s*)|(\.\s*)|\.+/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .replace(/(\s+$)/g, '')
        .split(' ').join('-');
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  chooseImage(field, idx?) {
    const modal = this.modalService.open(ImageUploaderComponent, this.modalOptions);
    modal.afterClosed()
      .subscribe(
        result => {
          if (field === 'title_lg') {
            this.project.title_image_lg = result;
          } else if (field === 'title_md') {
            this.project.title_image_md = result;
          } else if (field === 'title_sm') {
            this.project.title_image_sm = result;
          } else if (field === 'logo') {
            this.project.logo = result;
          } else if (field === 'featured') {
            this.project.featured_image = result;
          } else if (field === 'image') {
            this.imageList[idx] = result;
          }
        },
        error => this.setError(error)
      );
  }

  addItem(array) {
    // console.log('adding highlight');
    array.push('');
  }

  deleteItem(array, id) {
    // console.log('deleting highlight');
    array.splice(id, 1);
  }

  submit(data, isValid) {
    this.submitted = true;

    if (isValid) {
      this.formLoading = true;
      this.project.highlights = this.highlightList;
      this.project.images = this.imageList;
      console.log(this.project);
      this.projectService.validateProject(this.project)
        .subscribe(
          res => {
            if (res.isValid) {
              this.projectService.createProject(this.project)
                .subscribe(
                  newRes => {
                    this.success = true;
                    this.formLoading = false;
                  },
                  newErr => this.setError('New project error: ' + newErr)
                );
            } else {
              this.invalid = true;
              this.setError('Please fix errors above');
            }
          },
          err => this.setError('Validation error: ' + err)
        );
    }
  }

  addAnother() {
    this.project = new Project();
    this.highlightList = new Array<string>(3).fill('');
    this.imageList = new Array<string>(3).fill('');
    this.submitted = false;
    this.success = false;
  }

  setError(err) {
    this.error = err;
    console.error(err);
    this.formLoading = false;
  }
}
