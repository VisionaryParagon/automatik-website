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

// Resources
import { ResourcesComponent } from './resources/resources.component';
import { ResourcesMainComponent } from './resources/resources-main/resources-main.component';
import { BlogComponent } from './resources/blog/blog.component';
import { BlogPostComponent } from './resources/blog/blog-post/blog-post.component';

// About
import { AboutComponent } from './about/about.component';

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
    ResourcesComponent,
    ResourcesMainComponent,
    BlogComponent,
    BlogPostComponent,
    AboutComponent
  ]
})
export class MainModule { }
