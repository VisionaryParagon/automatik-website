import { NgModule } from '@angular/core';

// App Modules
import { AppSharedModule } from '../app-shared.module';
import { AdminRoutingModule } from './admin-routing.module';

// Components
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

// Assets
import { AdminAssetsComponent } from './admin-assets/admin-assets.component';

// Portfolio
import { AdminPortfolioComponent } from './admin-portfolio/admin-portfolio.component';

// About
import { AdminTeamComponent } from './admin-team/admin-team.component';
import { AdminCareersComponent } from './admin-careers/admin-careers.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';

// Modal Components
import { ImageUploaderComponent } from './modals/image-uploader/image-uploader.component';
import { VideoUploaderComponent } from './modals/video-uploader/video-uploader.component';
import { AssetEditComponent } from './modals/asset-edit/asset-edit.component';
import { AssetDeleteComponent } from './modals/asset-delete/asset-delete.component';
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
    AdminAssetsComponent,
    AdminPortfolioComponent,
    AdminTeamComponent,
    AdminCareersComponent,
    AdminNewsComponent,
    ImageUploaderComponent,
    VideoUploaderComponent,
    AssetEditComponent,
    AssetDeleteComponent,
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
    VideoUploaderComponent,
    AssetEditComponent,
    AssetDeleteComponent,
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
