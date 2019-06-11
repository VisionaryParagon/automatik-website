import { NgModule } from '@angular/core';

// App Modules
import { AppSharedModule } from '../app-shared.module';
import { AdminRoutingModule } from './admin-routing.module';

// Components
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

// Training
import { AdminTrainingComponent } from './admin-training/admin-training.component';
import { WorkshopsComponent } from './admin-training/workshops/workshops.component';
import { RegistrantsComponent } from './admin-training/registrants/registrants.component';

// Portfolio
import { AdminPortfolioComponent } from './admin-portfolio/admin-portfolio.component';

// Team
import { AdminTeamComponent } from './admin-team/admin-team.component';

// Careers
import { AdminCareersComponent } from './admin-careers/admin-careers.component';

// Images
import { AdminImagesComponent } from './admin-images/admin-images.component';

// Modal Components
import { ImageUploaderComponent } from './modals/image-uploader/image-uploader.component';
import { ImageEditComponent } from './modals/image-edit/image-edit.component';
import { ImageDeleteComponent } from './modals/image-delete/image-delete.component';
import { WorkshopFormComponent } from './modals/workshop-form/workshop-form.component';
import { WorkshopDeleteComponent } from './modals/workshop-delete/workshop-delete.component';
import { WorkshopRegistrantFormComponent } from './modals/workshop-registrant-form/workshop-registrant-form.component';
import { WorkshopRegistrantCancelComponent } from './modals/workshop-registrant-cancel/workshop-registrant-cancel.component';
import { WorkshopRegistrantRefundComponent } from './modals/workshop-registrant-refund/workshop-registrant-refund.component';
import { WorkshopRegistrantDeleteComponent } from './modals/workshop-registrant-delete/workshop-registrant-delete.component';
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

// CSV components
import { RegistrantCsvComponent } from './csv/registrant-csv/registrant-csv.component';

@NgModule({
  imports: [
    AppSharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminTrainingComponent,
    WorkshopsComponent,
    RegistrantsComponent,
    AdminPortfolioComponent,
    AdminTeamComponent,
    AdminCareersComponent,
    AdminImagesComponent,
    ImageUploaderComponent,
    ImageEditComponent,
    ImageDeleteComponent,
    WorkshopFormComponent,
    WorkshopDeleteComponent,
    WorkshopRegistrantFormComponent,
    WorkshopRegistrantCancelComponent,
    WorkshopRegistrantRefundComponent,
    WorkshopRegistrantDeleteComponent,
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
    RegistrantCsvComponent
  ],
  entryComponents: [
    ImageUploaderComponent,
    ImageEditComponent,
    ImageDeleteComponent,
    WorkshopFormComponent,
    WorkshopDeleteComponent,
    WorkshopRegistrantFormComponent,
    WorkshopRegistrantCancelComponent,
    WorkshopRegistrantRefundComponent,
    WorkshopRegistrantDeleteComponent,
    PortfolioFormComponent,
    PortfolioDeleteComponent,
    TeamFormComponent,
    TeamDeleteComponent,
    DepartmentFormComponent,
    DepartmentDeleteComponent,
    CareerFormComponent,
    CareerDeleteComponent
  ]
})
export class AdminModule { }
