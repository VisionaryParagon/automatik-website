import { NgModule } from '@angular/core';

// App Modules
import { AppSharedModule } from '../app-shared.module';
import { MainRoutingModule } from './main-routing.module';

// Components
import { MainComponent } from './main.component';
import { IntroComponent } from './intro/intro.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { CoursesComponent } from './courses/courses.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ResourcesComponent } from './resources/resources.component';
import { AboutComponent } from './about/about.component';

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
    CoursesComponent,
    PortfolioComponent,
    ResourcesComponent,
    AboutComponent
  ]
})
export class MainModule { }
