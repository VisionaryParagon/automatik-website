import { NgModule } from '@angular/core';

// App Modules
import { AppSharedModule } from '../app-shared.module';
import { MainRoutingModule } from './main-routing.module';

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
import { TeamComponent } from './about/team/team.component';
import { CareersComponent } from './about/careers/careers.component';

// Modal Components
import { CareerInquiryComponent } from '../modals/career-inquiry/career-inquiry.component';
import { ImageUploaderComponent } from '../modals/image-uploader/image-uploader.component';

@NgModule({
  imports: [
    AppSharedModule,
    MainRoutingModule
  ],
  declarations: [
    MainComponent,
    HomeComponent,
    ServicesComponent,
    CoursesComponent,
    PortfolioComponent,
    PortfolioMainComponent,
    PortfolioProjectComponent,
    ResourcesComponent,
    ResourcesMainComponent,
    BlogComponent,
    BlogMainComponent,
    BlogAuthorComponent,
    BlogCategoryComponent,
    BlogPostComponent,
    AboutComponent,
    AboutMainComponent,
    TeamComponent,
    CareersComponent,
    CareerInquiryComponent,
    ImageUploaderComponent
  ],
  entryComponents: [
    CareerInquiryComponent,
    ImageUploaderComponent
  ]
})
export class MainModule { }
