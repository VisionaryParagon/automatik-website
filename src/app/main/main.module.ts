import { NgModule } from '@angular/core';

// App Modules
import { AppSharedModule } from '../app-shared.module';
import { MainRoutingModule } from './main-routing.module';

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
import { TeamComponent } from './about/team/team.component';
import { CareersComponent } from './about/careers/careers.component';

// Modal Components
import { CareerInquiryComponent } from './modals/career-inquiry/career-inquiry.component';

// Snippets
import { CarouselComponent } from './snippets/carousel/carousel.component';

@NgModule({
  imports: [
    AppSharedModule,
    MainRoutingModule
  ],
  declarations: [
    MainComponent,
    IntroComponent,
    HomeComponent,
    ServicesComponent,
    ServicesMainComponent,
    EventPlanningComponent,
    EventProductionComponent,
    InstructionalDesignComponent,
    GraphicDesignComponent,
    VideoProductionComponent,
    AppWebDevelopmentComponent,
    CoursesComponent,
    PortfolioComponent,
    PortfolioMainComponent,
    PortfolioProjectComponent,
    ResourcesComponent,
    ResourcesMainComponent,
    BlogComponent,
    BlogMainComponent,
    BlogPostComponent,
    AboutComponent,
    AboutMainComponent,
    TeamComponent,
    CareersComponent,
    CareerInquiryComponent,
    CarouselComponent
  ],
  entryComponents: [
    CareerInquiryComponent
  ]
})
export class MainModule { }
