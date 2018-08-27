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
          metatags: [
            {
              name: 'description',
              content: 'automätik is a certified woman-owned business committed to eradicating boring corporate events, training, and elearning from the face of the earth.'
            },
            {
              name: 'keywords',
              content: 'Corporate Events, Meeting master, sales training'
            },
            {
              property: 'og:title',
              content: 'Eradicating boring corporate events from the face of the Earth | automätik'
            },
            {
              property: 'og:type',
              content: 'website'
            },
            {
              property: 'og:url',
              content: 'https://beta.automatik9dots.com/'
            },
            {
              property: 'og:image',
              content: 'https://assets.automatik9dots.com/images/home-eradicating-boring-corporate-events-bg-2560.jpg'
            },
            {
              property: 'og:description',
              content: 'automätik is a certified woman-owned business committed to eradicating boring corporate events, training, and elearning from the face of the earth.'
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
              content: 'Eradicating boring corporate events from the face of the Earth | automätik'
            },
            {
              name: 'twitter:description',
              content: 'automätik is a certified woman-owned business committed to eradicating boring corporate events, training, and elearning from the face of the earth.'
            },
            {
              name: 'twitter:image:src',
              content: 'https://assets.automatik9dots.com/images/home-eradicating-boring-corporate-events-bg-2560.jpg'
            }
          ]
        }
      },
      {
        path: 'services',
        component: ServicesComponent,
        data: {
          title: 'Turnkey corporate events services and experiences that deliver results | automätik',
          metatags: [
            {
              name: 'description',
              content: 'automätik events are produced by our team of in-house departments, including: event management & production, instructional design, graphic & web design.'
            },
            {
              name: 'keywords',
              content: 'Event Services, Event management, Event Production, Instructional Design, Graphic Design, Video Production, Web development, app development, technology'
            },
            {
              property: 'og:title',
              content: 'Turnkey corporate events services and experiences that deliver results | automätik'
            },
            {
              property: 'og:type',
              content: 'website'
            },
            {
              property: 'og:url',
              content: 'https://beta.automatik9dots.com/services'
            },
            {
              property: 'og:image',
              content: 'https://assets.automatik9dots.com/images/home-eradicating-boring-corporate-events-bg-2560.jpg'
            },
            {
              property: 'og:description',
              content: 'automätik events are produced by our team of in-house departments, including: event management & production, instructional design, graphic & web design.'
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
              content: 'Turnkey corporate events services and experiences that deliver results | automätik'
            },
            {
              name: 'twitter:description',
              content: 'automätik events are produced by our team of in-house departments, including: event management & production, instructional design, graphic & web design.'
            },
            {
              name: 'twitter:image:src',
              content: 'https://assets.automatik9dots.com/images/home-eradicating-boring-corporate-events-bg-2560.jpg'
            }
          ]
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
          metatags: [
            {
              name: 'description',
              content: 'Description for Courses.'
            },
            {
              name: 'keywords',
              content: 'courses'
            },
            {
              property: 'og:title',
              content: 'automätik courses'
            },
            {
              property: 'og:type',
              content: 'website'
            },
            {
              property: 'og:url',
              content: 'https://beta.automatik9dots.com/courses'
            },
            {
              property: 'og:image',
              content: 'https://assets.automatik9dots.com/images/home-eradicating-boring-corporate-events-bg-2560.jpg'
            },
            {
              property: 'og:description',
              content: 'Description for Courses.'
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
              content: 'automätik courses'
            },
            {
              name: 'twitter:description',
              content: 'Description for Courses.'
            },
            {
              name: 'twitter:image:src',
              content: 'https://assets.automatik9dots.com/images/home-eradicating-boring-corporate-events-bg-2560.jpg'
            }
          ]
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
              metatags: [
                {
                  name: 'description',
                  content: 'Description for Portfolio.'
                },
                {
                  name: 'keywords',
                  content: 'portfolio'
                },
                {
                  property: 'og:title',
                  content: 'automätik portfolio'
                },
                {
                  property: 'og:type',
                  content: 'website'
                },
                {
                  property: 'og:url',
                  content: 'https://beta.automatik9dots.com/portfolio'
                },
                {
                  property: 'og:image',
                  content: 'https://assets.automatik9dots.com/images/home-eradicating-boring-corporate-events-bg-2560.jpg'
                },
                {
                  property: 'og:description',
                  content: 'Description for Portfolio.'
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
                  content: 'automätik portfolio'
                },
                {
                  name: 'twitter:description',
                  content: 'Description for Portfolio.'
                },
                {
                  name: 'twitter:image:src',
                  content: 'https://assets.automatik9dots.com/images/home-eradicating-boring-corporate-events-bg-2560.jpg'
                }
              ]
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
              metatags: [
                {
                  name: 'description',
                  content: 'Description for Blog.'
                },
                {
                  name: 'keywords',
                  content: 'blog'
                },
                {
                  property: 'og:title',
                  content: 'automätik blog'
                },
                {
                  property: 'og:type',
                  content: 'website'
                },
                {
                  property: 'og:url',
                  content: 'https://beta.automatik9dots.com/resources/blog'
                },
                {
                  property: 'og:image',
                  content: 'https://assets.automatik9dots.com/images/home-eradicating-boring-corporate-events-bg-2560.jpg'
                },
                {
                  property: 'og:description',
                  content: 'Description for Blog.'
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
                  content: 'automätik blog'
                },
                {
                  name: 'twitter:description',
                  content: 'Description for Blog.'
                },
                {
                  name: 'twitter:image:src',
                  content: 'https://assets.automatik9dots.com/images/home-eradicating-boring-corporate-events-bg-2560.jpg'
                }
              ]
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
              metatags: [
                {
                  name: 'description',
                  content: 'Description for Resources.'
                },
                {
                  name: 'keywords',
                  content: 'resources'
                },
                {
                  property: 'og:title',
                  content: 'automätik resources'
                },
                {
                  property: 'og:type',
                  content: 'website'
                },
                {
                  property: 'og:url',
                  content: 'https://beta.automatik9dots.com/resources'
                },
                {
                  property: 'og:image',
                  content: 'https://assets.automatik9dots.com/images/home-eradicating-boring-corporate-events-bg-2560.jpg'
                },
                {
                  property: 'og:description',
                  content: 'Description for Resources.'
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
                  content: 'automätik resources'
                },
                {
                  name: 'twitter:description',
                  content: 'Description for Resources.'
                },
                {
                  name: 'twitter:image:src',
                  content: 'https://assets.automatik9dots.com/images/home-eradicating-boring-corporate-events-bg-2560.jpg'
                }
              ]
            }
          },
          {
            path: 'blog',
            component: BlogComponent,
            data: {
              title: 'automätik blog',
              metatags: [
                {
                  name: 'description',
                  content: 'Description for Blog.'
                },
                {
                  name: 'keywords',
                  content: 'blog'
                },
                {
                  property: 'og:title',
                  content: 'automätik blog'
                },
                {
                  property: 'og:type',
                  content: 'website'
                },
                {
                  property: 'og:url',
                  content: 'https://beta.automatik9dots.com/resources/blog'
                },
                {
                  property: 'og:image',
                  content: 'https://assets.automatik9dots.com/images/home-eradicating-boring-corporate-events-bg-2560.jpg'
                },
                {
                  property: 'og:description',
                  content: 'Description for Blog.'
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
                  content: 'automätik blog'
                },
                {
                  name: 'twitter:description',
                  content: 'Description for Blog.'
                },
                {
                  name: 'twitter:image:src',
                  content: 'https://assets.automatik9dots.com/images/home-eradicating-boring-corporate-events-bg-2560.jpg'
                }
              ]
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
              metatags: [
                {
                  name: 'description',
                  content: 'Description for About.'
                },
                {
                  name: 'keywords',
                  content: 'about'
                },
                {
                  property: 'og:title',
                  content: 'about automätik'
                },
                {
                  property: 'og:type',
                  content: 'website'
                },
                {
                  property: 'og:url',
                  content: 'https://beta.automatik9dots.com/about'
                },
                {
                  property: 'og:image',
                  content: 'https://assets.automatik9dots.com/images/home-eradicating-boring-corporate-events-bg-2560.jpg'
                },
                {
                  property: 'og:description',
                  content: 'Description for About.'
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
                  content: 'about automätik'
                },
                {
                  name: 'twitter:description',
                  content: 'Description for About.'
                },
                {
                  name: 'twitter:image:src',
                  content: 'https://assets.automatik9dots.com/images/home-eradicating-boring-corporate-events-bg-2560.jpg'
                }
              ]
            }
          },
          /*
          {
            path: 'careers',
            component: CareersComponent,
            data: {
              title: 'careers at automätik',
              metatags: [
                {
                  name: 'description',
                  content: 'Description for Careers.'
                },
                {
                  name: 'keywords',
                  content: 'careers'
                },
                {
                  property: 'og:title',
                  content: 'careers at automätik'
                },
                {
                  property: 'og:type',
                  content: 'website'
                },
                {
                  property: 'og:url',
                  content: 'https://beta.automatik9dots.com/careers'
                },
                {
                  property: 'og:image',
                  content: 'https://assets.automatik9dots.com/images/home-eradicating-boring-corporate-events-bg-2560.jpg'
                },
                {
                  property: 'og:description',
                  content: 'Description for Careers.'
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
                  content: 'careers at automätik'
                },
                {
                  name: 'twitter:description',
                  content: 'Description for Careers.'
                },
                {
                  name: 'twitter:image:src',
                  content: 'https://assets.automatik9dots.com/images/home-eradicating-boring-corporate-events-bg-2560.jpg'
                }
              ]
            }
          },
          */
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
