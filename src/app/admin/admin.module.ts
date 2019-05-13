import { NgModule } from '@angular/core';

// App Modules
import { AppSharedModule } from '../app-shared.module';
import { AdminRoutingModule } from './admin-routing.module';

// Components
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

// Images
import { AdminImagesComponent } from './admin-images/admin-images.component';

// Portfolio
import { AdminPortfolioComponent } from './admin-portfolio/admin-portfolio.component';

// About
import { AdminTeamComponent } from './admin-team/admin-team.component';
import { AdminCareersComponent } from './admin-careers/admin-careers.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';

// Modal Components
import { ImageUploaderComponent } from './modals/image-uploader/image-uploader.component';
import { ImageEditComponent } from './modals/image-edit/image-edit.component';
import { ImageDeleteComponent } from './modals/image-delete/image-delete.component';
import { PortfolioFormComponent } from './modals/portfolio-form/portfolio-form.component';
import { PortfolioDeleteComponent } from './modals/portfolio-delete/portfolio-delete.component';
import { TeamFormComponent } from './modals/team-form/team-form.component';
import { TeamDeleteComponent } from './modals/team-delete/team-delete.component';
import { DepartmentFormComponent } from './modals/department-form/department-form.component';
import { DepartmentDeleteComponent } from './modals/department-delete/department-delete.component';
import { DepartmentDataComponent } from './admin-team/department-data/department-data.component';
import { TeamDataComponent } from './admin-team/team-data/team-data.component';
import { CareerFormComponent } from './modals/career-form/career-form.component';
import { CareerDeleteComponent } from './modals/career-delete/career-delete.component';
import { NewsFormComponent } from './modals/news-form/news-form.component';
import { NewsDeleteComponent } from './modals/news-delete/news-delete.component';

@NgModule({
  imports: [
    AppSharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminImagesComponent,
    AdminPortfolioComponent,
    AdminTeamComponent,
    AdminCareersComponent,
    AdminNewsComponent,
    ImageUploaderComponent,
    ImageEditComponent,
    ImageDeleteComponent,
    PortfolioFormComponent,
    PortfolioDeleteComponent,
    TeamFormComponent,
    TeamDeleteComponent,
    DepartmentFormComponent,
    DepartmentDeleteComponent,
    DepartmentDataComponent,
    TeamDataComponent,
    CareerFormComponent,
    CareerDeleteComponent,
    NewsFormComponent,
    NewsDeleteComponent
  ],
  entryComponents: [
    ImageUploaderComponent,
    ImageEditComponent,
    ImageDeleteComponent,
    PortfolioFormComponent,
    PortfolioDeleteComponent,
    TeamFormComponent,
    TeamDeleteComponent,
    DepartmentFormComponent,
    DepartmentDeleteComponent,
    CareerFormComponent,
    CareerDeleteComponent,
    NewsFormComponent,
    NewsDeleteComponent
  ]
})
export class AdminModule { }
