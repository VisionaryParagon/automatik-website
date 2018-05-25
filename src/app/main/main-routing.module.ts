import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Services

// Components
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';

// Services
import { ServicesComponent } from './services/services.component';

// Courses
import { CoursesComponent } from './courses/courses.component';

// Portfolio
import { PortfolioComponent } from './portfolio/portfolio.component';

// Resources
import { ResourcesComponent } from './resources/resources.component';
import { ResourcesMainComponent } from './resources/resources-main/resources-main.component';
import { BlogComponent } from './resources/blog/blog.component';
import { BlogAuthorComponent } from './resources/blog/blog-author/blog-author.component';
import { BlogCategoryComponent } from './resources/blog/blog-category/blog-category.component';
import { BlogPostComponent } from './resources/blog/blog-post/blog-post.component';

// About
import { AboutComponent } from './about/about.component';
import { AboutMainComponent } from './about/about-main/about-main.component';
import { CareersComponent } from './about/careers/careers.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          title: 'automätik',
          metatags: {
            description: 'Eradicating boring corporate events from the face of the Earth.',
            keywords: 'automatik, automatic, auto, event, education, training'
          }
        }
      },
      {
        path: 'services',
        component: ServicesComponent,
        data: {
          title: 'automätik services',
          metatags: {
            description: 'Description for Services',
            keywords: 'services'
          }
        },
        children: [
          {
            path: '**',
            redirectTo: '/services'
          }
        ]
      },
      {
        path: 'courses',
        component: CoursesComponent,
        data: {
          title: 'automätik courses',
          metatags: {
            description: 'Description for Courses.',
            keywords: 'courses'
          }
        },
        children: [
          {
            path: '**',
            redirectTo: '/courses'
          }
        ]
      },
      {
        path: 'portfolio',
        component: PortfolioComponent,
        data: {
          title: 'automätik portfolio',
          metatags: {
            description: 'Description for Portfolio.',
            keywords: 'portfolio'
          }
        },
        children: [
          {
            path: '**',
            redirectTo: '/portfolio'
          }
        ]
      },
      {
        path: 'resources',
        component: ResourcesComponent,
        children: [
          {
            path: '',
            component: ResourcesMainComponent,
            data: {
              title: 'automätik resources',
              metatags: {
                description: 'Description for Resources.',
                keywords: 'resources'
              }
            }
          },
          {
            path: 'blog',
            component: BlogComponent,
            data: {
              title: 'automätik blog',
              metatags: {
                description: 'Description for Blog.',
                keywords: 'blog'
              }
            }
          },
          {
            path: 'blog/author/:slug',
            component: BlogAuthorComponent
          },
          {
            path: 'blog/category/:slug',
            component: BlogCategoryComponent
          },
          {
            path: 'blog/post/:slug',
            component: BlogPostComponent
          },
          {
            path: '**',
            redirectTo: '/resources'
          }
        ]
      },
      {
        path: 'about',
        component: AboutComponent,
        children: [
          {
            path: '',
            component: AboutMainComponent,
            data: {
              title: 'about automätik',
              metatags: {
                description: 'Description for About.',
                keywords: 'about'
              }
            }
          },
          {
            path: 'careers',
            component: CareersComponent,
            data: {
              title: 'careers at automätik',
              metatags: {
                description: 'Description for Careers.',
                keywords: 'careers'
              }
            }
          },
          {
            path: '**',
            redirectTo: '/about'
          }
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class MainRoutingModule {}
