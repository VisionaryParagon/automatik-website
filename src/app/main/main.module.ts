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

// Training
import { TrainingComponent } from './training/training.component';
import { TrainingMainComponent } from './training/training-main/training-main.component';
import { WorkshopsComponent } from './training/workshops/workshops.component';
import { WorkshopsMainComponent } from './training/workshops/workshops-main/workshops-main.component';
import { WorkshopsEventComponent } from './training/workshops/workshops-event/workshops-event.component';
import { MentoringComponent } from './training/mentoring/mentoring.component';

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
import { TeamComponent } from './about/team/team.component';
import { ValuesComponent } from './about/values/values.component';
import { CareersComponent } from './about/careers/careers.component';

// Modal Components
import { CareerInquiryComponent } from './modals/career-inquiry/career-inquiry.component';
import { WorkshopRegistrationComponent } from './modals/workshop-registration/workshop-registration.component';

// Snippets
import { CarouselComponent } from './snippets/carousel/carousel.component';
import { ParallaxBgComponent } from './snippets/parallax-bg/parallax-bg.component';
import { ScrollArrowComponent } from './snippets/scroll-arrow/scroll-arrow.component';

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
    TrainingComponent,
    TrainingMainComponent,
    WorkshopsComponent,
    WorkshopsMainComponent,
    WorkshopsEventComponent,
    MentoringComponent,
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
    ContactComponent,
    TeamComponent,
    ValuesComponent,
    CareersComponent,
    CareerInquiryComponent,
    WorkshopRegistrationComponent,
    CarouselComponent,
    ParallaxBgComponent,
    ScrollArrowComponent
  ],
  entryComponents: [
    CareerInquiryComponent,
    WorkshopRegistrationComponent
  ]
})
export class MainModule { }
