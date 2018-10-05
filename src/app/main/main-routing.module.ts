import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Services
import { IntroGuardService } from '../services/intro-guard.service';

// Components
import { MainComponent } from './main.component';
import { IntroComponent } from './intro/intro.component';
import { HomeComponent } from './home/home.component';

// Services
import { ServicesComponent } from './services/services.component';
import { ServicesMainComponent } from './services/services-main/services-main.component';
import { EventPlanningComponent } from './services/event-planning/event-planning.component';
import { EventProductionComponent } from './services/event-production/event-production.component';
import { InstructionalDesignComponent } from './services/instructional-design/instructional-design.component';
import { GraphicDesignComponent } from './services/graphic-design/graphic-design.component';
import { VideoProductionComponent } from './services/video-production/video-production.component';
import { AppWebDevelopmentComponent } from './services/app-web-development/app-web-development.component';

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
import { BlogPostComponent } from './resources/blog/blog-post/blog-post.component';

// About
import { AboutComponent } from './about/about.component';
import { AboutMainComponent } from './about/about-main/about-main.component';
import { ContactComponent } from './about/contact/contact.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        // canActivate: [IntroGuardService],
        data: {
          title: 'Eradicating boring training from the face of the Earth | automätik',
          metatags: [
            {
              name: 'description',
              content: 'automätik is a certified woman-owned business committed to eradicating boring training and e-learning from the face of the earth.'
            },
            {
              name: 'keywords',
              content: 'Corporate Events, Meeting master, sales training'
            },
            {
              property: 'og:title',
              content: 'Eradicating boring training from the face of the Earth | automätik'
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
              content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
            },
            {
              property: 'og:description',
              content: 'automätik is a certified woman-owned business committed to eradicating boring training and e-learning from the face of the earth.'
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
              content: 'Eradicating boring training from the face of the Earth | automätik'
            },
            {
              name: 'twitter:description',
              content: 'automätik is a certified woman-owned business committed to eradicating boring training and e-learning from the face of the earth.'
            },
            {
              name: 'twitter:image:src',
              content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
            }
          ]
        }
      },
      {
        path: 'services',
        component: ServicesComponent,
        // canActivate: [IntroGuardService],
        children: [
          {
            path: '',
            // canActivateChild: [IntroGuardService],
            children: [
              {
                path: '',
                component: ServicesMainComponent,
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
                      content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
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
                      content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
                    }
                  ]
                }
              },
              {
                path: 'event-planning',
                component: EventPlanningComponent,
                data: {
                  title: 'Event Planning | automätik',
                  metatags: [
                    {
                      name: 'description',
                      content: 'Over the years, our event planning team has managed, staffed, and planned thousands of nationwide events for corporations of every shape and size. (And we do it with a smile.)'
                    },
                    {
                      name: 'keywords',
                      content: 'Event Planning, agenda planning, hotel sourcing and contracting, site procurement, OEM automotive training tour routing, OEM automotive press drives, shuttle sourcing, food and beverage planning, contract staffing, vehicle acquisition, vehicle transportation, uniform sourcing, gifts and premiums sourcing'
                    },
                    {
                      property: 'og:title',
                      content: 'Event Planning | automätik'
                    },
                    {
                      property: 'og:type',
                      content: 'website'
                    },
                    {
                      property: 'og:url',
                      content: 'https://beta.automatik9dots.com/services/event-planning'
                    },
                    {
                      property: 'og:image',
                      content: 'https://assets.automatik9dots.com/images/event-planning-hero-bg-2560.jpg'
                    },
                    {
                      property: 'og:description',
                      content: 'Over the years, our event planning team has managed, staffed, and planned thousands of nationwide events for corporations of every shape and size. (And we do it with a smile.)'
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
                      content: 'Event Planning | automätik'
                    },
                    {
                      name: 'twitter:description',
                      content: 'Over the years, our event planning team has managed, staffed, and planned thousands of nationwide events for corporations of every shape and size. (And we do it with a smile.)'
                    },
                    {
                      name: 'twitter:image:src',
                      content: 'https://assets.automatik9dots.com/images/event-planning-hero-bg-2560.jpg'
                    }
                  ]
                }
              },
              {
                path: 'event-production',
                component: EventProductionComponent,
                data: {
                  title: 'Event Production | automätik',
                  metatags: [
                    {
                      name: 'description',
                      content: 'Through two decades of helping some of the most recognizable brands produce impactful events, our Event Production crew has the expertise to transform your next event into an unforgettable experience.'
                    },
                    {
                      name: 'keywords',
                      content: 'Event Production, Vehicle acquisition, transportation, staging, screen rental, video rental, audio visual rental, LED lighting rental, track setup design, event stage rental'
                    },
                    {
                      property: 'og:title',
                      content: 'Event Production | automätik'
                    },
                    {
                      property: 'og:type',
                      content: 'website'
                    },
                    {
                      property: 'og:url',
                      content: 'https://beta.automatik9dots.com/services/event-production'
                    },
                    {
                      property: 'og:image',
                      content: 'https://assets.automatik9dots.com/images/event-production-hero-bg-2560.jpg'
                    },
                    {
                      property: 'og:description',
                      content: 'Through two decades of helping some of the most recognizable brands produce impactful events, our Event Production crew has the expertise to transform your next event into an unforgettable experience.'
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
                      content: 'Event Production | automätik'
                    },
                    {
                      name: 'twitter:description',
                      content: 'Through two decades of helping some of the most recognizable brands produce impactful events, our Event Production crew has the expertise to transform your next event into an unforgettable experience.'
                    },
                    {
                      name: 'twitter:image:src',
                      content: 'https://assets.automatik9dots.com/images/event-production-hero-bg-2560.jpg'
                    }
                  ]
                }
              },
              {
                path: 'instructional-design',
                component: InstructionalDesignComponent,
                data: {
                  title: 'Instructional Design | automätik',
                  metatags: [
                    {
                      name: 'description',
                      content: 'automatik specializes in instructional design for engaging instructor-led, participant training; elearning design; educational technology; and gamification.'
                    },
                    {
                      name: 'keywords',
                      content: 'Instructional Design, Product launch training, sales skill training, consultative sales training, parts and service training, management training, train the trainer training, instructional design, elearning, corporate learning consulting, presentation training, powerpoint training, slide design training, and executive presentation consultation'
                    },
                    {
                      property: 'og:title',
                      content: 'Instructional Design | automätik'
                    },
                    {
                      property: 'og:type',
                      content: 'website'
                    },
                    {
                      property: 'og:url',
                      content: 'https://beta.automatik9dots.com/services/instructional-design'
                    },
                    {
                      property: 'og:image',
                      content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
                    },
                    {
                      property: 'og:description',
                      content: 'automatik specializes in instructional design for engaging instructor-led, participant training; elearning design; educational technology; and gamification.'
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
                      content: 'Instructional Design | automätik'
                    },
                    {
                      name: 'twitter:description',
                      content: 'automatik specializes in instructional design for engaging instructor-led, participant training; elearning design; educational technology; and gamification.'
                    },
                    {
                      name: 'twitter:image:src',
                      content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
                    }
                  ]
                }
              },
              {
                path: 'graphic-design',
                component: GraphicDesignComponent,
                data: {
                  title: 'Graphic Design | automätik',
                  metatags: [
                    {
                      name: 'description',
                      content: 'From design strategy to hassle-free production, automätik’s full-service design team ensures that your corporate event is a complete extension of your brand.'
                    },
                    {
                      name: 'keywords',
                      content: 'Graphic Design, Visual identity, packaging, digital advertising, graphic design, logo design, layout, large format graphic design, banner design, environmental design, CAD, website design'
                    },
                    {
                      property: 'og:title',
                      content: 'Graphic Design | automätik'
                    },
                    {
                      property: 'og:type',
                      content: 'website'
                    },
                    {
                      property: 'og:url',
                      content: 'https://beta.automatik9dots.com/services/graphic-design'
                    },
                    {
                      property: 'og:image',
                      content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
                    },
                    {
                      property: 'og:description',
                      content: 'From design strategy to hassle-free production, automätik’s full-service design team ensures that your corporate event is a complete extension of your brand.'
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
                      content: 'Graphic Design | automätik'
                    },
                    {
                      name: 'twitter:description',
                      content: 'From design strategy to hassle-free production, automätik’s full-service design team ensures that your corporate event is a complete extension of your brand.'
                    },
                    {
                      name: 'twitter:image:src',
                      content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
                    }
                  ]
                }
              },
              {
                path: 'video-production',
                component: VideoProductionComponent,
                data: {
                  title: 'Video Production | automätik',
                  metatags: [
                    {
                      name: 'description',
                      content: 'automätik’s award-winning video production team offers professional services including corporate and product videos, on-site event and royalty-free videos.'
                    },
                    {
                      name: 'keywords',
                      content: 'Video Production, Onsite videography, post production, motion graphic design, audio recording and mixing, corporate video production, opening videos, closing videos, royalty-free videos'
                    },
                    {
                      property: 'og:title',
                      content: 'Video Production | automätik'
                    },
                    {
                      property: 'og:type',
                      content: 'website'
                    },
                    {
                      property: 'og:url',
                      content: 'https://beta.automatik9dots.com/services/video-production'
                    },
                    {
                      property: 'og:image',
                      content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
                    },
                    {
                      property: 'og:description',
                      content: 'automätik’s award-winning video production team offers professional services including corporate and product videos, on-site event and royalty-free videos.'
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
                      content: 'Video Production | automätik'
                    },
                    {
                      name: 'twitter:description',
                      content: 'automätik’s award-winning video production team offers professional services including corporate and product videos, on-site event and royalty-free videos.'
                    },
                    {
                      name: 'twitter:image:src',
                      content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
                    }
                  ]
                }
              },
              {
                path: 'app-and-web-development',
                component: AppWebDevelopmentComponent,
                data: {
                  title: 'App & Web Development | automätik',
                  metatags: [
                    {
                      name: 'description',
                      content: 'automätik’s full-service web design team specializes in everything web – from UI/UX design and digital event guides, to gamification and augmented reality, we’ve got you covered.'
                    },
                    {
                      name: 'keywords',
                      content: 'App / Web Development, UI / UX Design, event websites, registration websites, digital event guides, live polling, gamification, elearning, augmented reality, virtual product explorations, Apple ARKit'
                    },
                    {
                      property: 'og:title',
                      content: 'App & Web Development | automätik'
                    },
                    {
                      property: 'og:type',
                      content: 'website'
                    },
                    {
                      property: 'og:url',
                      content: 'https://beta.automatik9dots.com/services/app-and-web-development'
                    },
                    {
                      property: 'og:image',
                      content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
                    },
                    {
                      property: 'og:description',
                      content: 'automätik’s full-service web design team specializes in everything web – from UI/UX design and digital event guides, to gamification and augmented reality, we’ve got you covered.'
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
                      content: 'App & Web Development | automätik'
                    },
                    {
                      name: 'twitter:description',
                      content: 'automätik’s full-service web design team specializes in everything web – from UI/UX design and digital event guides, to gamification and augmented reality, we’ve got you covered.'
                    },
                    {
                      name: 'twitter:image:src',
                      content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
                    }
                  ]
                }
              }
            ]
          },
          {
            path: '**',
            redirectTo: '/services'
          }
        ]
      },
      {
        path: 'courses',
        component: CoursesComponent,
        // canActivate: [IntroGuardService],
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
              content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
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
              content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
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
        // canActivate: [IntroGuardService],
        children: [
          {
            path: '',
            // canActivateChild: [IntroGuardService],
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
                      content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
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
                      content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
                    }
                  ]
                }
              },
              {
                path: ':slug',
                component: PortfolioProjectComponent
              }
            ]
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
              title: 'Corporate Event Services Blog | automätik',
              metatags: [
                {
                  name: 'description',
                  content: 'automätik’s blog for all things corporate events including planning and managing events, instructional design, graphic design, AV, and technology.'
                },
                {
                  name: 'keywords',
                  content: 'Corporate Event Services Blog, event planning and management, instructional design, graphic design'
                },
                {
                  property: 'og:title',
                  content: 'Corporate Event Services Blog | automätik'
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
                  content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
                },
                {
                  property: 'og:description',
                  content: 'automätik’s blog for all things corporate events including planning and managing events, instructional design, graphic design, AV, and technology.'
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
                  content: 'Corporate Event Services Blog | automätik'
                },
                {
                  name: 'twitter:description',
                  content: 'automätik’s blog for all things corporate events including planning and managing events, instructional design, graphic design, AV, and technology.'
                },
                {
                  name: 'twitter:image:src',
                  content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
                }
              ]
            }
          },
          {
            path: ':slug',
            component: BlogPostComponent
          },
          {
            path: '**',
            redirectTo: '/resources/blog'
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
            // canActivate: [IntroGuardService],
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
                  content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
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
                  content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
                }
              ]
            }
          },
          {
            path: 'blog',
            component: BlogComponent,
            children: [
              {
                path: '',
                component: BlogMainComponent,
                data: {
                  title: 'Corporate Event Services Blog | automätik',
                  metatags: [
                    {
                      name: 'description',
                      content: 'automätik’s blog for all things corporate events including planning and managing events, instructional design, graphic design, AV, and technology.'
                    },
                    {
                      name: 'keywords',
                      content: 'blog'
                    },
                    {
                      property: 'og:title',
                      content: 'Corporate Event Services Blog | automätik'
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
                      content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
                    },
                    {
                      property: 'og:description',
                      content: 'automätik’s blog for all things corporate events including planning and managing events, instructional design, graphic design, AV, and technology.'
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
                      content: 'Corporate Event Services Blog | automätik'
                    },
                    {
                      name: 'twitter:description',
                      content: 'automätik’s blog for all things corporate events including planning and managing events, instructional design, graphic design, AV, and technology.'
                    },
                    {
                      name: 'twitter:image:src',
                      content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
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
          {
            path: 'blog/:slug',
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
        // canActivate: [IntroGuardService],
        children: [
          {
            path: '',
            // canActivateChild: [IntroGuardService],
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
                      content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
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
                      content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
                    }
                  ]
                }
              },
              {
                path: 'contact',
                component: ContactComponent,
                data: {
                  title: 'contact automätik',
                  metatags: [
                    {
                      name: 'description',
                      content: 'Description for Contact.'
                    },
                    {
                      name: 'keywords',
                      content: 'contact'
                    },
                    {
                      property: 'og:title',
                      content: 'contact automätik'
                    },
                    {
                      property: 'og:type',
                      content: 'website'
                    },
                    {
                      property: 'og:url',
                      content: 'https://beta.automatik9dots.com/about/contact'
                    },
                    {
                      property: 'og:image',
                      content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
                    },
                    {
                      property: 'og:description',
                      content: 'Description for Contact.'
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
                      content: 'contact automätik'
                    },
                    {
                      name: 'twitter:description',
                      content: 'Description for Contact.'
                    },
                    {
                      name: 'twitter:image:src',
                      content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
                    }
                  ]
                }
              }
            ]
          },
          {
            path: '**',
            redirectTo: '/about'
          }
        ]
      }
    ]
  },
  /*
  {
    path: 'intro',
    component: IntroComponent,
    data: {
      title: 'automätik',
      metatags: [
        {
          name: 'robots',
          content: 'noindex,nofollow'
        }
      ]
    }
  },
  */
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
  ]
})
export class MainRoutingModule {}
