import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Services
import { IntroService } from '../services/intro.service';

// Components
import { MainComponent } from './main.component';
import { IntroComponent } from './intro/intro.component';
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
import { BlogPostComponent } from './resources/blog/blog-post/blog-post.component';

// About
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [IntroService],
    children: [
      {
        path: '',
        canActivateChild: [IntroService],
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
                description: 'Eradicating boring corporate events from the face of the Earth.',
                keywords: 'automatik, automatic, auto, event, education, training'
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
                description: 'Eradicating boring corporate events from the face of the Earth.',
                keywords: 'automatik, automatic, auto, event, education, training'
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
                description: 'Eradicating boring corporate events from the face of the Earth.',
                keywords: 'automatik, automatic, auto, event, education, training'
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
                    description: 'Eradicating boring corporate events from the face of the Earth.',
                    keywords: 'automatik, automatic, auto, event, education, training'
                  }
                }
              },
              {
                path: 'blog',
                component: BlogComponent,
                data: {
                  title: 'automätik blog',
                  metatags: {
                    description: 'Eradicating boring corporate events from the face of the Earth.',
                    keywords: 'automatik, automatic, auto, event, education, training'
                  }
                }
              },
              {
                path: 'blog/post/:id',
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
            data: {
              title: 'about automätik',
              metatags: {
                description: 'Eradicating boring corporate events from the face of the Earth.',
                keywords: 'automatik, automatic, auto, event, education, training'
              }
            },
            children: [
              {
                path: '**',
                redirectTo: '/about'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: 'welcome',
    component: IntroComponent,
    data: {
      title: 'automätik',
      metatags: {
        description: 'Eradicating boring corporate events from the face of the Earth.',
        keywords: 'automatik, automatic, auto, event, education, training'
      }
    }
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
    IntroService
  ]
})
export class MainRoutingModule {}
