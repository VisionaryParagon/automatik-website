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
import { PortfolioMainComponent } from './portfolio/portfolio-main/portfolio-main.component';
import { PortfolioProjectComponent } from './portfolio/portfolio-project/portfolio-project.component';

// Resources
import { ResourcesComponent } from './resources/resources.component';
import { ResourcesMainComponent } from './resources/resources-main/resources-main.component';
import { BlogComponent } from './resources/blog/blog.component';
import { BlogMainComponent } from './resources/blog/blog-main/blog-main.component';
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
          title: 'Eradicating boring corporate events from the face of the Earth | automätik',
          metatags: {
            description: 'automätik is a certified woman-owned business committed to eradicating boring corporate events, training, and elearning from the face of the earth.',
            keywords: 'Corporate Events, Meeting master, sales training'
          }
        }
      },
      {
        path: 'services',
        component: ServicesComponent,
        data: {
          title: 'Turnkey corporate events services and experiences that deliver results | automätik',
          metatags: {
            description: 'automätik events are produced by our team of in-house departments, including: event management & production, instructional design, graphic & web design.',
            keywords: 'Event Services, Event management, Event Production, Instructional Design, Graphic Design, Video Production, Web development, app development, technology'
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
        children: [
          {
            path: '',
            component: PortfolioMainComponent,
            data: {
              title: 'automätik portfolio',
              metatags: {
                description: 'Description for Portfolio.',
                keywords: 'portfolio'
              }
            }
          },
          {
            path: ':slug',
            component: PortfolioProjectComponent
          },
          {
            path: '**',
            redirectTo: '/portfolio'
          }
        ]
      },
      {
        path: 'resources/blog',
        component: BlogComponent,
        children: [
          {
            path: '',
            component: BlogMainComponent,
            data: {
              title: 'automätik blog',
              metatags: {
                description: 'Description for Blog.',
                keywords: 'blog'
              }
            }
          },
          {
            path: 'author/:slug',
            component: BlogAuthorComponent
          },
          {
            path: 'category/:slug',
            component: BlogCategoryComponent
          },
          {
            path: 'post/:slug',
            component: BlogPostComponent
          },
          {
            path: '**',
            redirectTo: '/blog'
          }
        ]
      },
      /*
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
      */
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
